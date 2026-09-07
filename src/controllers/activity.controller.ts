import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { getAllActivity } from "../services/activity.service.js";

export const getActivity = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const activities = await getAllActivity();

    res.status(200).json({
      success: true,
      message: "Activity retrieved successfully",
      data: activities,
    });
  } catch (error) {
    next(error);
  }
};