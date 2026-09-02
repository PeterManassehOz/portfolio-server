import { Types } from "mongoose";

import { ExperienceModel } from "../models/experience.model";

import type {
  Experience,
  CreateExperienceInput,
  UpdateExperienceInput,
} from "../types/experience";

export const getExperiences = async (): Promise<Experience[]> => {
  return ExperienceModel.find()
    .sort({ createdAt: 1 })
    .lean<Experience[]>()
    .exec();
};

export const getExperienceById = async (
  id: string
): Promise<Experience | null> => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  return ExperienceModel.findById(id)
    .lean<Experience>()
    .exec();
};

export const createExperience = async (
  experienceData: CreateExperienceInput
): Promise<Experience> => {
  const experience = await ExperienceModel.create(
    experienceData
  );

  return experience.toObject() as Experience;
};

export const updateExperience = async (
  id: string,
  experienceData: UpdateExperienceInput
): Promise<Experience | null> => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  return ExperienceModel.findByIdAndUpdate(
    id,
    experienceData,
    {
      new: true,
      runValidators: true,
    }
  )
    .lean<Experience>()
    .exec();
};

export const deleteExperience = async (
  id: string
): Promise<Experience | null> => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  return ExperienceModel.findByIdAndDelete(id)
    .lean<Experience>()
    .exec();
};