import { AboutModel } from "../models/about.model.js";

import type {
  About,
  CreateAboutInput,
  UpdateAboutInput,
} from "../types/about.js";

import { AppError } from "../utils/app-error.js";

export const getAbout = async (): Promise<About | null> => {
  return AboutModel.findOne()
    .lean<About>()
    .exec();
};

export const createAbout = async (
  aboutData: CreateAboutInput
): Promise<About> => {
  const existingAbout =
    await AboutModel.findOne()
      .lean()
      .exec();

  if (existingAbout) {
    throw new AppError(
      "About information already exists",
      409
    );
  }

  const about =
    await AboutModel.create(aboutData);

  return about.toObject() as About;
};

export const updateAbout = async (
  aboutData: UpdateAboutInput
): Promise<About> => {
  const about =
    await AboutModel.findOneAndUpdate(
      {},
      aboutData,
      {
        new: true,
        runValidators: true,
      }
    )
      .lean<About>()
      .exec();

  if (!about) {
    throw new AppError(
      "About information not found",
      404
    );
  }

  return about;
};

export const deleteAbout = async (): Promise<About> => {
  const about =
    await AboutModel.findOneAndDelete({})
      .lean<About>()
      .exec();

  if (!about) {
    throw new AppError(
      "About information not found",
      404
    );
  }

  return about;
};