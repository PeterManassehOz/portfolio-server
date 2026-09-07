import { Types } from "mongoose";

import { EducationModel } from "../models/education.model.js";

import type {
  Education,
  CreateEducationInput,
  UpdateEducationInput,
} from "../types/education.js";

import { AppError } from "../utils/app-error.js";

export const getEducation =
  async (): Promise<Education[]> => {
    return EducationModel.find()
      .sort({ createdAt: 1 })
      .lean<Education[]>()
      .exec();
  };

export const getEducationById = async (
  id: string
): Promise<Education> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(
      "Invalid education ID",
      400
    );
  }

  const education =
    await EducationModel.findById(id)
      .lean<Education>()
      .exec();

  if (!education) {
    throw new AppError(
      "Education record not found",
      404
    );
  }

  return education;
};

export const createEducation = async (
  educationData: CreateEducationInput
): Promise<Education> => {
  const education =
    await EducationModel.create(
      educationData
    );

  return education.toObject() as Education;
};

export const updateEducation = async (
  id: string,
  educationData: UpdateEducationInput
): Promise<Education> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(
      "Invalid education ID",
      400
    );
  }

  const education =
    await EducationModel.findByIdAndUpdate(
      id,
      educationData,
      {
        new: true,
        runValidators: true,
      }
    )
      .lean<Education>()
      .exec();

  if (!education) {
    throw new AppError(
      "Education record not found",
      404
    );
  }

  return education;
};

export const deleteEducation = async (
  id: string
): Promise<Education> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(
      "Invalid education ID",
      400
    );
  }

  const education =
    await EducationModel.findByIdAndDelete(id)
      .lean<Education>()
      .exec();

  if (!education) {
    throw new AppError(
      "Education record not found",
      404
    );
  }

  return education;
};