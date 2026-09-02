import type {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../services/achievement.service";

export const getAllAchievements = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const achievements = await getAchievements();

    res.status(200).json({
      success: true,
      data: achievements,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleAchievement = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Achievement ID is required",
      });

      return;
    }

    const achievement = await getAchievementById(id);

    if (!achievement) {
      res.status(404).json({
        success: false,
        message: "Achievement not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: achievement,
    });
  } catch (error) {
    next(error);
  }
};

export const createNewAchievement = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const achievement = await createAchievement(req.body);

    res.status(201).json({
      success: true,
      message: "Achievement created successfully",
      data: achievement,
    });
  } catch (error) {
    next(error);
  }
};

export const updateExistingAchievement = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Achievement ID is required",
      });

      return;
    }

    const achievement = await updateAchievement(
      id,
      req.body
    );

    if (!achievement) {
      res.status(404).json({
        success: false,
        message: "Achievement not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Achievement updated successfully",
      data: achievement,
    });
  } catch (error) {
    next(error);
  }
};

export const removeAchievement = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Achievement ID is required",
      });

      return;
    }

    const achievement = await deleteAchievement(id);

    if (!achievement) {
      res.status(404).json({
        success: false,
        message: "Achievement not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Achievement deleted successfully",
      data: achievement,
    });
  } catch (error) {
    next(error);
  }
};