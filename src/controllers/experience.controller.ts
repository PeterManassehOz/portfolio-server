import type {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../services/experience.service";

export const getAllExperiences = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const experiences = await getExperiences();

    res.status(200).json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Experience ID is required",
      });

      return;
    }

    const experience = await getExperienceById(id);

    if (!experience) {
      res.status(404).json({
        success: false,
        message: "Experience not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

export const createNewExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const experience = await createExperience(req.body);

    res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

export const updateExistingExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Experience ID is required",
      });

      return;
    }

    const experience = await updateExperience(
      id,
      req.body
    );

    if (!experience) {
      res.status(404).json({
        success: false,
        message: "Experience not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSingleExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Experience ID is required",
      });

      return;
    }

    const experience = await deleteExperience(id);

    if (!experience) {
      res.status(404).json({
        success: false,
        message: "Experience not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};