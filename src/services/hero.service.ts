import { HeroModel } from "../models/hero.model";

import type {
  Hero,
  CreateHeroInput,
  UpdateHeroInput,
} from "../types/hero";

export const getHero = async (): Promise<Hero | null> => {
  return HeroModel.findOne()
    .lean<Hero>()
    .exec();
};

export const createHero = async (
  heroData: CreateHeroInput
): Promise<Hero> => {
  const existingHero = await HeroModel.findOne()
    .lean<Hero>()
    .exec();

  if (existingHero) {
    throw new Error("Hero content already exists");
  }

  const hero = await HeroModel.create(heroData);

  return hero.toObject() as Hero;
};

export const updateHero = async (
  heroData: UpdateHeroInput
): Promise<Hero | null> => {
  return HeroModel.findOneAndUpdate(
    {},
    heroData,
    {
      new: true,
      runValidators: true,
    }
  )
    .lean<Hero>()
    .exec();
};

export const deleteHero = async (): Promise<Hero | null> => {
  return HeroModel.findOneAndDelete({})
    .lean<Hero>()
    .exec();
};