import type {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

import { env } from "../config/env.js";

import type { AuthenticatedAdmin } from "../types/auth.js";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authorizationHeader =
      req.headers.authorization;

    if (!authorizationHeader) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });

      return;
    }

    const [scheme, token] =
      authorizationHeader.split(" ");

    if (
      scheme !== "Bearer" ||
      !token
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid authorization header",
      });

      return;
    }

    const decoded = jwt.verify(
      token,
      env.JWT_SECRET
    );

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      typeof decoded.id !== "string" ||
      typeof decoded.email !== "string" ||
      decoded.role !== "Admin"
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });

      return;
    }

    const admin: AuthenticatedAdmin = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    req.admin = admin;

    next();
  } catch (error) {
    if (
      error instanceof jwt.TokenExpiredError
    ) {
      res.status(401).json({
        success: false,
        message: "Authentication token has expired",
      });

      return;
    }

    if (
      error instanceof jwt.JsonWebTokenError
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });

      return;
    }

    next(error);
  }
};