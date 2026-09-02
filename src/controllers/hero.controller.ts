import type {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  getHero,
  createHero,
  updateHero,
  deleteHero,
} from "../services/hero.service";

export const getHeroContent = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const hero = await getHero();

    if (!hero) {
      res.status(404).json({
        success: false,
        message: "Hero content not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: hero,
    });
  } catch (error) {
    next(error);
  }
};

export const createHeroContent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const hero = await createHero(req.body);

    res.status(201).json({
      success: true,
      message: "Hero content created successfully",
      data: hero,
    });
  } catch (error) {
    next(error);
  }
};


export const updateHeroContent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const hero = await updateHero(req.body);

    if (!hero) {
      res.status(404).json({
        success: false,
        message: "Hero content not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Hero content updated successfully",
      data: hero,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteHeroContent = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const hero = await deleteHero();

    if (!hero) {
      res.status(404).json({
        success: false,
        message: "Hero content not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Hero content deleted successfully",
      data: hero,
    });
  } catch (error) {
    next(error);
  }
};