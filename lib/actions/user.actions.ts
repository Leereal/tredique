"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";
import { clerkClient } from "@clerk/nextjs";

import { CreateUserParams, UpdateUserParams } from "@/types";
import CreditTransaction from "../database/models/credit-transaction.models";

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(userId: any) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (user.role) {
      const response = await clerkClient.users.updateUserMetadata(clerkId, {
        publicMetadata: {
          role: user.role,
        },
      });
    }

    if (!updatedUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits({
  userId,
  creditFee,
  transactionType,
  transactionDetails,
}: {
  userId: string;
  creditFee: number;
  transactionType: string;
  transactionDetails: any;
}) {
  try {
    await connectToDatabase();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true }
    );

    if (!updatedUserCredits) throw new Error("User credits update failed");

    // Record the credit transaction
    await CreditTransaction.create({
      user: userId,
      amount: creditFee,
      transactionType,
      transactionDetails,
    });

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserByClerkId(clerkId: any) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId });

    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllUsers({
  query,
  limit = 100,
  page = 1,
  role,
}: {
  query?: string;
  limit?: number;
  page?: number;
  role?: string;
}) {
  try {
    await connectToDatabase();

    // Construct search condition
    const searchCondition = query
      ? {
          $or: [
            { firstName: { $regex: query, $options: "i" } }, // Assuming you have firstName field
            { lastName: { $regex: query, $options: "i" } }, // Assuming you have lastName field
            { email: { $regex: query, $options: "i" } },
            { role: role },
          ],
        }
      : {};

    // Combine conditions
    const conditions = searchCondition; // If you have additional conditions, you might need to adjust this

    const skipAmount = (Number(page) - 1) * limit;

    // Fetch users with conditions
    const usersQuery = User.find(conditions)
      .sort({ createdAt: "desc" }) // or any other field you want to sort by
      .skip(skipAmount)
      .limit(limit);

    const users = await usersQuery;
    const usersCount = await User.countDocuments(conditions); // Just get the count here

    return {
      data: JSON.parse(JSON.stringify(users)),
      totalPages: Math.ceil(usersCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
