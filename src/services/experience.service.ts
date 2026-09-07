import { Types } from "mongoose";

import { ExperienceModel } from "../models/experience.model.js";

import type {
  Experience,
  CreateExperienceInput,
  UpdateExperienceInput,
} from "../types/experience.js";

import { AppError } from "../utils/app-error.js";

export const getExperiences =
  async (): Promise<Experience[]> => {
    return ExperienceModel.find()
      .sort({ createdAt: 1 })
      .lean<Experience[]>()
      .exec();
  };

export const getExperienceById = async (
  id: string
): Promise<Experience> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(
      "Invalid experience ID",
      400
    );
  }

  const experience =
    await ExperienceModel.findById(id)
      .lean<Experience>()
      .exec();

  if (!experience) {
    throw new AppError(
      "Experience entry not found",
      404
    );
  }

  return experience;
};

export const createExperience = async (
  experienceData: CreateExperienceInput
): Promise<Experience> => {
  const experience =
    await ExperienceModel.create(
      experienceData
    );

  return experience.toObject() as Experience;
};

export const updateExperience = async (
  id: string,
  experienceData: UpdateExperienceInput
): Promise<Experience> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(
      "Invalid experience ID",
      400
    );
  }

  const experience =
    await ExperienceModel.findByIdAndUpdate(
      id,
      experienceData,
      {
        new: true,
        runValidators: true,
      }
    )
      .lean<Experience>()
      .exec();

  if (!experience) {
    throw new AppError(
      "Experience entry not found",
      404
    );
  }

  return experience;
};

export const deleteExperience = async (
  id: string
): Promise<Experience> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(
      "Invalid experience ID",
      400
    );
  }

  const experience =
    await ExperienceModel.findByIdAndDelete(id)
      .lean<Experience>()
      .exec();

  if (!experience) {
    throw new AppError(
      "Experience entry not found",
      404
    );
  }

  return experience;
};