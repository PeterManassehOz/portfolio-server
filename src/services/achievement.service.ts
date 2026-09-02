import { Types } from "mongoose";

import { AchievementModel } from "../models/achievement.model";

import type {
  Achievement,
  CreateAchievementInput,
  UpdateAchievementInput,
} from "../types/achievements";

export const getAchievements = async (): Promise<Achievement[]> => {
  return AchievementModel.find()
    .sort({ createdAt: 1 })
    .lean<Achievement[]>()
    .exec();
};

export const getAchievementById = async (
  id: string
): Promise<Achievement | null> => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  return AchievementModel.findById(id)
    .lean<Achievement>()
    .exec();
};

export const createAchievement = async (
  achievementData: CreateAchievementInput
): Promise<Achievement> => {
  const achievement = await AchievementModel.create(
    achievementData
  );

  return achievement.toObject() as Achievement;
};

export const updateAchievement = async (
  id: string,
  achievementData: UpdateAchievementInput
): Promise<Achievement | null> => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  return AchievementModel.findByIdAndUpdate(
    id,
    achievementData,
    {
      new: true,
      runValidators: true,
    }
  )
    .lean<Achievement>()
    .exec();
};

export const deleteAchievement = async (
  id: string
): Promise<Achievement | null> => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  return AchievementModel.findByIdAndDelete(id)
    .lean<Achievement>()
    .exec();
};