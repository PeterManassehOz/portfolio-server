import type {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  loginAdmin,
  forgotPassword,
  resetPassword,
} from "../services/auth.service.js";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await loginAdmin(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await forgotPassword(req.body);

    res.status(200).json({
      success: true,
      message:
        "If an account exists with that email, a password reset link has been sent.",
    });
  } catch (error) {
    next(error);
  }
};

export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await resetPassword(req.body);

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};