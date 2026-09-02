import { Router } from "express";

import {
  getAboutController,
  createAboutController,
  updateAboutController,
  deleteAboutController,
} from "../controllers/about.controller";

import { validate } from "../middlewares/validate";

import {
  createAboutSchema,
  updateAboutSchema,
} from "../validators/about.validator";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAboutController);

router.post(
  "/",
  authenticate,
  validate(createAboutSchema),
  createAboutController
);

router.patch(
  "/",
  authenticate,
  validate(updateAboutSchema),
  updateAboutController
);

router.delete(
  "/",
  authenticate,
  deleteAboutController
);

export default router;