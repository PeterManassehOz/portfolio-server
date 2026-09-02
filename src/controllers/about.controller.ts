import type { Request, Response, NextFunction } from "express";

import {
  getAbout,
  createAbout,
  updateAbout,
  deleteAbout,
} from "../services/about.service";

import type { About } from "../types/about";

export const getAboutController = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const about = await getAbout();

    if (!about) {
      res.status(404).json({
        success: false,
        message: "About information not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: about,
    });
  } catch (error) {
    next(error);
  }
};

export const createAboutController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const about = await createAbout(
      req.body as About
    );

    res.status(201).json({
      success: true,
      message: "About information created successfully",
      data: about,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAboutController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const about = await updateAbout(
      req.body as Partial<About>
    );

    if (!about) {
      res.status(404).json({
        success: false,
        message: "About information not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "About information updated successfully",
      data: about,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAboutController = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const about = await deleteAbout();

    if (!about) {
      res.status(404).json({
        success: false,
        message: "About information not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "About information deleted successfully",
      data: about,
    });
  } catch (error) {
    next(error);
  }
};