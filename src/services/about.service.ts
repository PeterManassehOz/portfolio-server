import { AboutModel } from "../models/about.model";
import type { About } from "../types/about";

export const getAbout = async (): Promise<About | null> => {
  return AboutModel.findOne()
    .lean<About>()
    .exec();
};

export const createAbout = async (
  aboutData: About
): Promise<About> => {
  const existingAbout = await AboutModel.findOne()
    .lean()
    .exec();

  if (existingAbout) {
    throw new Error("About information already exists");
  }

  const about = await AboutModel.create(aboutData);

  return about.toObject() as About;
};

export const updateAbout = async (
  aboutData: Partial<About>
): Promise<About | null> => {
  return AboutModel.findOneAndUpdate(
    {},
    aboutData,
    {
      new: true,
      runValidators: true,
    }
  )
    .lean<About>()
    .exec();
};

export const deleteAbout = async (): Promise<About | null> => {
  return AboutModel.findOneAndDelete({})
    .lean<About>()
    .exec();
};