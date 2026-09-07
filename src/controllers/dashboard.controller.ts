import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { getDashboardData } from "../services/dashboard.service.js";

export const getDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const dashboard = await getDashboardData();

    res.status(200).json({
      success: true,
      message: "Dashboard data retrieved successfully",
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};