"use server";

import { CreateForexSignalParams, UpdateForexSignalParams } from "@/types";
import { connectToDatabase } from "../database";
import Robot from "../database/models/robot.models";
import RobotCategory from "../database/models/robot-category.models";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

// Function to get a Robot by its ID
export async function getRobotById(robotId: string) {
  try {
    await connectToDatabase();

    // Find the robot by its ID and populate the 'creator' and 'category' fields
    const robot = await Robot.findById(robotId)
      .populate("creator", "_id firstName lastName")
      .populate("category", "_id name");

    if (!robot) throw new Error("Robot not found");

    return JSON.parse(JSON.stringify(robot));
  } catch (error) {
    handleError(error);
  }
}

// Function to create a new Robot
export async function createRobot({
  userId,
  robotData,
  path,
}: {
  userId: string;
  robotData: any;
  path: string;
}) {
  try {
    await connectToDatabase();

    // Find the user who is creating the robot
    const creator = await User.findById(userId);

    if (!creator) throw new Error("Creator not found");

    // Create the robot with the provided data
    const newRobot = await Robot.create({
      ...robotData,
      creator: userId,
    });
    // Revalidate the cache path
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newRobot));
  } catch (error) {
    handleError(error);
  }
}

// Function to update an existing Robot
export async function updateRobot({
  userId,
  robotId,
  robotData,
  path,
}: {
  userId: string;
  robotId: string;
  robotData: any;
  path: string;
}) {
  try {
    await connectToDatabase();

    // Find the robot to update and ensure that the requesting user is its creator
    const robotToUpdate = await Robot.findById(robotId);
    if (!robotToUpdate || robotToUpdate.creator.toHexString() !== userId) {
      throw new Error("Unauthorized or robot not found");
    }

    // Update the robot with the provided data
    const updatedRobot = await Robot.findByIdAndUpdate(
      robotId,
      { ...robotData },
      { new: true }
    );

    // Revalidate the cache path
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedRobot));
  } catch (error) {
    handleError(error);
  }
}

// Function to delete a Robot
export async function deleteRobot({
  userId,
  robotId,
  path,
}: {
  userId: string;
  robotId: string;
  path: string;
}) {
  try {
    await connectToDatabase();

    // Find the robot to delete and ensure that the requesting user is its creator
    const deletedRobot = await Robot.findOneAndDelete({
      _id: robotId,
      creator: userId,
    });

    if (deletedRobot) {
      // Revalidate the cache path
      revalidatePath(path);
    }
  } catch (error) {
    handleError(error);
  }
}

// Function to get all Robots
export async function getAllRobots() {
  try {
    await connectToDatabase();

    // Find all robots and populate the 'creator' and 'category' fields
    const robots = await Robot.find()
      .populate("creator", "_id firstName lastName")
      .populate("category", "_id name");

    return JSON.parse(JSON.stringify(robots));
  } catch (error) {
    handleError(error);
  }
}
