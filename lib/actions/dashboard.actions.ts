import { connectToDatabase } from "../database";
import Signal from "../database/models/signal.models"; // Adjust the import path as necessary
import { handleError } from "../utils";

export async function getDashData() {
  //TODO : add dummy fake data to totals
  try {
    await connectToDatabase();

    // Overall totals and breakdowns
    const overallAggregation = [
      {
        $match: { profit: { $gt: 0 } }, // Only consider wins
      },
      {
        $group: {
          _id: "$isPremium",
          totalWins: { $sum: 1 },
        },
      },
      {
        $project: {
          isPremium: "$_id",
          totalWins: 1,
          _id: 0,
        },
      },
    ];

    const overallResults = await Signal.aggregate(overallAggregation);
    const premiumWins = overallResults.find((result) => result.isPremium) || {
      totalWins: 0,
    };
    const freeWins = overallResults.find((result) => !result.isPremium) || {
      totalWins: 0,
    };

    //Weekly Results
    const currentWeekNumber = getCurrentWeekNumber();

    // Weekly totals and breakdowns for the current week
    const weeklyAggregation = [
      {
        $match: {
          $expr: {
            $eq: [{ $week: "$createdAt" }, currentWeekNumber],
          },
        },
      },
      {
        $group: {
          _id: {
            isBinary: "$isBinary",
          },
          totalSignals: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          totalForex: {
            $sum: {
              $cond: [{ $eq: ["$_id.isBinary", false] }, "$totalSignals", 0],
            },
          },
          totalBinary: {
            $sum: {
              $cond: [{ $eq: ["$_id.isBinary", true] }, "$totalSignals", 0],
            },
          },
        },
      },
      {
        $project: {
          totalForex: 1,
          totalBinary: 1,
          _id: 0,
        },
      },
    ];

    const weeklyResults = await Signal.aggregate(weeklyAggregation);

    // Robot generated signals aggregation (simplified version, adjust as necessary)
    const robotGeneratedAggregation = [
      {
        $match: {
          robot: { $exists: true },
          //   createdAt: { $gte: startOfWeek }, // Optional: filter by date
        },
      },
      {
        $group: {
          _id: "$isBinary",
          count: { $sum: 1 },
        },
      },
    ];

    const robotResults = await Signal.aggregate(robotGeneratedAggregation);

    return {
      overall: {
        totalWins: premiumWins.totalWins + freeWins.totalWins,
        premiumWins: premiumWins.totalWins,
        freeWins: freeWins.totalWins,
      },
      weeklyTotals: weeklyResults,
      robotGenerated: robotResults.reduce(
        (acc, curr) => {
          acc[curr._id ? "totalBinary" : "totalForex"] = curr.count;
          return acc;
        },
        { totalForex: 0, totalBinary: 0 }
      ),
    };
  } catch (error) {
    handleError(error);
  }
}

function getCurrentWeekNumber() {
  const now: any = new Date();
  const startOfYear: any = new Date(now.getFullYear(), 0, 0);
  const diff = now - startOfYear;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  const weekNumber = Math.floor(diff / oneWeek);
  return weekNumber;
}
