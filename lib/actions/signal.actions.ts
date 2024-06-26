"use server";

import { CreateForexSignalParams, UpdateForexSignalParams } from "@/types";
import { connectToDatabase } from "../database";
import Robot from "../database/models/robot.models";
import SignalCategory from "../database/models/signal-category.models";
import Signal from "../database/models/signal.models";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

const getSignalCategoryByName = async (name: string) => {
  return SignalCategory.findOne({ name: { $regex: name, $options: "i" } });
};

const populateSignal = (signalsQueryResults: any) => {
  let query = signalsQueryResults
    .populate({
      path: "sender",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({
      path: "signalCategory",
      model: SignalCategory,
      select: "_id name",
    });

  // Check if `Robot` is a path in any of the documents before populating
  // This is a simplistic approach; for more complex cases, you might need to adjust the logic
  if (Signal.schema.path("Robot")) {
    query = query.populate({
      path: "Robot",
      model: Robot,
      select: "_id name",
      populate: {
        path: "category",
        model: "RobotCategory",
        select: "name",
      },
    });
  }

  return query;
};

// CREATE
export async function createSignal({
  userId,
  signal,
  path,
}: {
  userId: string;
  signal: any;
  path: string;
}) {
  try {
    await connectToDatabase();

    const sender = await User.findById(userId);
    if (!sender) throw new Error("Sender not found");
    const newSignal = await Signal.create({
      ...signal,
      signalCategory: signal.signalCategoryId,
      sender: userId,
      profit: null,
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newSignal));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE SIGNAL BY ID
export async function getSignalById(signalId: string) {
  try {
    await connectToDatabase();

    const signal = await populateSignal(Signal.findById(signalId));

    if (!signal) throw new Error("Signal not found");

    return JSON.parse(JSON.stringify(signal));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateSignal({
  userId,
  signal,
  path,
}: {
  userId: string;
  signal: any;
  path: string;
}) {
  try {
    await connectToDatabase();
    const loggedUser = await auth();
    const userRole = loggedUser.sessionClaims?.role;

    const signalToUpdate = await Signal.findById(signal._id);

    if (!signalToUpdate || userRole !== "Admin") {
      throw new Error("Unauthorized or signal not found");
    }

    const updatedSignal = await Signal.findByIdAndUpdate(
      signal._id,
      { ...signal, signalCategory: signal.signalCategoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedSignal));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteSignal({
  signalId,
  path,
}: {
  signalId: string;
  path: string;
}) {
  try {
    await connectToDatabase();

    const deletedSignal = await Signal.findByIdAndDelete(signalId);
    if (deletedSignal) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL SIGNAL
export async function getAllSignals({
  searchQuery = "",
  limit = 100,
  page = 1,
  signalCategory = "",
}: {
  searchQuery?: string;
  limit?: number;
  page?: number;
  signalCategory?: string;
}) {
  try {
    await connectToDatabase();
    const nameCondition = searchQuery
      ? { name: { $regex: searchQuery, $options: "i" } }
      : {};
    const signalCategoryCondition = signalCategory
      ? await getSignalCategoryByName(signalCategory)
      : null;

    const conditions = {
      $and: [
        nameCondition,
        signalCategoryCondition
          ? { signalCategory: signalCategoryCondition._id }
          : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const signalsQueryResults = Signal.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const signals = await populateSignal(signalsQueryResults);
    const signalsCount = await Signal.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(signals)),
      totalPages: Math.ceil(signalsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// // GET POSTS BY ORGANIZER
// export async function getSignalsByUser({ userId, limit = 100, page }) {
//   try {
//     await connectToDatabase();

//     const conditions = { sender: userId };
//     const skipAmount = (page - 1) * limit;

//     const signalsQuery = Signal.find(conditions)
//       .sort({ createdAt: "desc" })
//       .skip(skipAmount)
//       .limit(limit);

//     const signals = await populateSignal(signalsQuery);
//     const signalsCount = await Signal.countDocuments(conditions);

//     return {
//       data: JSON.parse(JSON.stringify(signals)),
//       totalPages: Math.ceil(signalsCount / limit),
//     };
//   } catch (error) {
//     handleError(error);
//   }
// }

// // GET RELATED SIGNALS: SIGNALS WITH SAME CATEGORY
// export async function getRelatedSignalsBySignalCategory({
//   signalCategoryId,
//   signalId,
//   limit = 3,
//   page = 1,
// }) {
//   try {
//     await connectToDatabase();

//     const skipAmount = (Number(page) - 1) * limit;
//     const conditions = {
//       $and: [{ signalCategory: signalCategoryId }, { _id: { $ne: signalId } }],
//     };

//     const signalsQuery = Signal.find(conditions)
//       .sort({ createdAt: "desc" })
//       .skip(skipAmount)
//       .limit(limit);

//     const signals = await populateSignal(signalsQuery);
//     const signalsCount = await Signal.countDocuments(conditions);

//     return {
//       data: JSON.parse(JSON.stringify(signals)),
//       totalPages: Math.ceil(signalsCount / limit),
//     };
//   } catch (error) {
//     handleError(error);
//   }
// }
