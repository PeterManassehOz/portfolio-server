import { Types } from "mongoose";

import { AchievementModel } from "../models/achievement.model.js";

import type {
  Achievement,
  CreateAchievementInput,
  UpdateAchievementInput,
} from "../types/achievements.js";

import { AppError } from "../utils/app-error.js";

export const getAchievements =
  async (): Promise<Achievement[]> => {
    return AchievementModel.find()
      .sort({ createdAt: 1 })
      .lean<Achievement[]>()
      .exec();
  };

export const getAchievementById = async (
  id: string
): Promise<Achievement> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(
      "Invalid achievement ID",
      400
    );
  }

  const achievement =
    await AchievementModel.findById(id)
      .lean<Achievement>()
      .exec();

  if (!achievement) {
    throw new AppError(
      "Achievement not found",
      404
    );
  }

  return achievement;
};

export const createAchievement = async (
  achievementData: CreateAchievementInput
): Promise<Achievement> => {
  const achievement =
    await AchievementModel.create(
      achievementData
    );

  return achievement.toObject() as Achievement;
};

export const updateAchievement = async (
  id: string,
  achievementData: UpdateAchievementInput
): Promise<Achievement> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(
      "Invalid achievement ID",
      400
    );
  }

  const achievement =
    await AchievementModel.findByIdAndUpdate(
      id,
      achievementData,
      {
        new: true,
        runValidators: true,
      }
    )
      .lean<Achievement>()
      .exec();

  if (!achievement) {
    throw new AppError(
      "Achievement not found",
      404
    );
  }

  return achievement;
};

export const deleteAchievement = async (
  id: string
): Promise<Achievement> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(
      "Invalid achievement ID",
      400
    );
  }

  const achievement =
    await AchievementModel.findByIdAndDelete(id)
      .lean<Achievement>()
      .exec();

  if (!achievement) {
    throw new AppError(
      "Achievement not found",
      404
    );
  }

  return achievement;
};