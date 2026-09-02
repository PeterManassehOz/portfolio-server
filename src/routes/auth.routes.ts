import { Router } from "express";

import {
  login,
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/auth.controller.js";

import { validate } from "../middlewares/validate.js";

import {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validators/auth.validator.js";

const router = Router();

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  forgotPasswordController
);

router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  resetPasswordController
);

export default router;