"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import Connection from "@/lib/database/models/connection.models";
import { handleError } from "@/lib/utils";
import Account from "../database/models/account.models";
import Robot from "../database/models/robot.models";

interface ConnectionParams {
  userId: string;
  connection: any;
  path: string;
}

const populateConnection = (query: any) => {
  return query
    .populate({
      path: "connector",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({
      path: "account",
      model: Account,
      select: "_id accountName balance active",
    })
    .populate({ path: "robot", model: Robot, select: "_id name version" });
};

// CREATE
export async function createConnection({
  userId,
  connection,
  path,
}: ConnectionParams) {
  try {
    await connectToDatabase();

    const connector = await User.findById(userId);
    if (!connector) throw new Error("Connector not found");

    const newConnection = await Connection.create({
      ...connection,
      connector: userId,
      account: connection.accountId,
      robot: connection.robotId,
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newConnection));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE CONNECTION BY ID
export async function getConnectionById(connectionId: string) {
  try {
    await connectToDatabase();

    const connection = await populateConnection(
      Connection.findById(connectionId)
    );

    if (!connection) throw new Error("Connection not found");

    return JSON.parse(JSON.stringify(connection));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateConnection({
  userId,
  connection,
  path,
}: ConnectionParams) {
  try {
    await connectToDatabase();

    const connectionToUpdate = await Connection.findById(connection._id);

    if (
      !connectionToUpdate ||
      connectionToUpdate.connector.toHexString() !== userId
    ) {
      throw new Error("Unauthorized or connection not found");
    }

    const updatedConnection = await Connection.findByIdAndUpdate(
      connection._id,
      {
        ...connection,
        robot: connection.robotId,
      },
      { new: true }
    );

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedConnection));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteConnection({
  connectionId,
  path,
}: {
  connectionId: string;
  path: string;
}) {
  try {
    await connectToDatabase();

    const deletedConnection = await Connection.findByIdAndDelete(connectionId);
    if (deletedConnection) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL CONNECTIONS
export async function getAllConnections({
  query,
  limit = 6,
  page = 1,
}: {
  query?: string;
  limit?: number;
  page?: number;
}) {
  try {
    await connectToDatabase();

    const nameCondition = query
      ? { name: { $regex: query, $options: "i" } }
      : {};

    const conditions: any = {
      $and: [nameCondition],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const connectionsQuery = Connection.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const connections = await populateConnection(connectionsQuery);
    const connectionsCount = await Connection.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(connections)),
      totalPages: Math.ceil(connectionsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET CONNECTIONS BY ORGANIZER
export async function getConnectionsByUser({
  userId,
  limit = 6,
  page = 1,
}: {
  userId: string;
  limit?: number;
  page?: number;
}) {
  try {
    await connectToDatabase();

    const conditions = { connector: userId };
    const skipAmount = (page - 1) * limit;

    const connectionsQuery = Connection.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const connections = await populateConnection(connectionsQuery);
    const connectionsCount = await Connection.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(connections)),
      totalPages: Math.ceil(connectionsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET RELATED CONNECTIONS: CONNECTIONS WITH SAME CATEGORY
export async function getRelatedConnectionsByCategory({
  categoryId,
  connectionId,
  limit = 3,
  page = 1,
}: {
  categoryId: string;
  connectionId: string;
  limit?: number;
  page?: number;
}) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: connectionId } }],
    };

    const connectionsQuery = Connection.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const connections = await populateConnection(connectionsQuery);
    const connectionsCount = await Connection.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(connections)),
      totalPages: Math.ceil(connectionsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
