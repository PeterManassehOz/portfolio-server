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

const router = Router();

router.get("/", getAboutController);

router.post(
  "/",
  validate(createAboutSchema),
  createAboutController
);

router.patch(
  "/",
  validate(updateAboutSchema),
  updateAboutController
);

router.delete(
  "/",
  deleteAboutController
);

export default router;