import { Types } from "mongoose";

import { EducationModel } from "../models/education.model";

import type {
  Education,
  CreateEducationInput,
  UpdateEducationInput,
} from "../types/education";

export const getEducation = async (): Promise<Education[]> => {
  return EducationModel.find()
    .sort({ createdAt: 1 })
    .lean<Education[]>()
    .exec();
};

export const getEducationById = async (
  id: string
): Promise<Education | null> => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  return EducationModel.findById(id)
    .lean<Education>()
    .exec();
};

export const createEducation = async (
  educationData: CreateEducationInput
): Promise<Education> => {
  const education = await EducationModel.create(
    educationData
  );

  return education.toObject() as Education;
};

export const updateEducation = async (
  id: string,
  educationData: UpdateEducationInput
): Promise<Education | null> => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  return EducationModel.findByIdAndUpdate(
    id,
    educationData,
    {
      new: true,
      runValidators: true,
    }
  )
    .lean<Education>()
    .exec();
};

export const deleteEducation = async (
  id: string
): Promise<Education | null> => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  return EducationModel.findByIdAndDelete(id)
    .lean<Education>()
    .exec();
};