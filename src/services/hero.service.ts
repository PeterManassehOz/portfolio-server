import { HeroModel } from "../models/hero.model.js";

import {
  deleteImage,
  uploadImage,
} from "./cloudinary.service.js";

import type {
  Hero,
  CreateHeroInput,
  UpdateHeroInput,
} from "../types/hero.js";

import { AppError } from "../utils/app-error.js";

export const getHero = async (): Promise<
  Hero | null
> => {
  return HeroModel.findOne()
    .lean<Hero>()
    .exec();
};

export const createHero = async (
  heroData: CreateHeroInput
): Promise<Hero> => {
  const existingHero =
    await HeroModel.findOne()
      .lean<Hero>()
      .exec();

  if (existingHero) {
    throw new AppError(
      "Hero content already exists",
      409
    );
  }

  const hero =
    await HeroModel.create(heroData);

  return hero.toObject() as Hero;
};

export const updateHero = async (
  heroData: UpdateHeroInput
): Promise<Hero> => {
  const existingHero =
    await HeroModel.findOne()
      .lean<Hero>()
      .exec();

  if (!existingHero) {
    throw new AppError(
      "Hero content not found",
      404
    );
  }

  const updatedHero =
    await HeroModel.findOneAndUpdate(
      {},
      heroData,
      {
        new: true,
        runValidators: true,
      }
    )
      .lean<Hero>()
      .exec();

  if (!updatedHero) {
    throw new AppError(
      "Hero content not found",
      404
    );
  }

  if (
    heroData.profileImage &&
    existingHero.profileImagePublicId &&
    heroData.profileImagePublicId !==
      existingHero.profileImagePublicId
  ) {
    await deleteImage(
      existingHero.profileImagePublicId
    );
  }

  return updatedHero;
};

export const deleteHero = async (): Promise<Hero> => {
  const hero =
    await HeroModel.findOne()
      .lean<Hero>()
      .exec();

  if (!hero) {
    throw new AppError(
      "Hero content not found",
      404
    );
  }

  const deletedHero =
    await HeroModel.findOneAndDelete({});

  if (!deletedHero) {
    throw new AppError(
      "Hero content not found",
      404
    );
  }

  if (hero.profileImagePublicId) {
    await deleteImage(
      hero.profileImagePublicId
    );
  }

  return deletedHero.toObject() as Hero;
};

export const uploadHeroImage = async (
  buffer: Buffer
) => {
  return uploadImage(
    buffer,
    "portfolio/hero"
  );
};