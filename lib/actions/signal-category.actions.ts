"use server";

import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import SignalCategory from "../database/models/signal-category.models";

export const createSignalCategory = async ({
  signalCategoryName,
}: {
  signalCategoryName: string;
}) => {
  try {
    await connectToDatabase();

    const newSignalCategory = await SignalCategory.create({
      name: signalCategoryName,
    });

    return JSON.parse(JSON.stringify(newSignalCategory));
  } catch (error) {
    handleError(error);
  }
};

export const getAllSignalCategories = async () => {
  try {
    await connectToDatabase();

    const signalCategories = await SignalCategory.find();

    return JSON.parse(JSON.stringify(signalCategories));
  } catch (error) {
    handleError(error);
  }
};
