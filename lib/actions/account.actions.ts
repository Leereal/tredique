"use server";

import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Account from "../database/models/account.models";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

interface AccountParams {
  userId: string;
  account: any;
  path: string;
}
// Function to populate account details with owner information
const populateAccount = (query: any) => {
  return query.populate({
    path: "owner",
    model: User,
    select: "_id firstName lastName",
  });
};

// Function to create a new account
export async function createAccount({ userId, account, path }: AccountParams) {
  try {
    await connectToDatabase();

    const owner = await User.findById(userId);
    if (!owner) throw new Error("Owner not found");

    const newAccount = await Account.create({
      ...account,
      owner: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newAccount));
  } catch (error) {
    handleError(error);
  }
}

// Function to get an account by its ID
export async function getAccountById(accountId: string) {
  try {
    await connectToDatabase();

    const account = await populateAccount(Account.findById(accountId));

    if (!account) throw new Error("Account not found");

    return JSON.parse(JSON.stringify(account));
  } catch (error) {
    handleError(error);
  }
}

// Function to update an existing account
export async function updateAccount({ userId, account, path }: AccountParams) {
  try {
    await connectToDatabase();

    const accountToUpdate = await Account.findById(account._id);
    if (!accountToUpdate || accountToUpdate.owner.toHexString() !== userId) {
      throw new Error("Unauthorized or account not found");
    }

    const updatedAccount = await Account.findByIdAndUpdate(
      account._id,
      { ...account },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedAccount));
  } catch (error) {
    handleError(error);
  }
}

// Function to delete an account
export async function deleteAccount({
  accountId,
  path,
}: {
  accountId: string;
  path: string;
}) {
  try {
    await connectToDatabase();

    const deletedAccount = await Account.findByIdAndDelete(accountId);
    if (deletedAccount) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// Function to get all accounts
export async function getAllAccounts({
  query,
  limit = 100,
  page = 1,
}: {
  query?: string;
  limit?: number;
  page?: number;
}) {
  try {
    await connectToDatabase();

    const accountNameCondition = query
      ? { account_name: { $regex: query, $options: "i" } }
      : {};
    const conditions = {
      $and: [accountNameCondition],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const accountsQuery = Account.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const accounts = await populateAccount(accountsQuery);
    const accountsCount = await Account.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(accounts)),
      totalPages: Math.ceil(accountsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// Function to get accounts by owner
export async function getAccountsByUser({
  userId,
  limit = 10,
  page = 1,
}: {
  userId: string;
  limit?: number;
  page?: number;
}) {
  try {
    await connectToDatabase();

    const conditions = { owner: userId };
    const skipAmount = (page - 1) * limit;

    const accountsQuery = Account.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const accounts = await populateAccount(accountsQuery);
    const accountsCount = await Account.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(accounts)),
      totalPages: Math.ceil(accountsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
