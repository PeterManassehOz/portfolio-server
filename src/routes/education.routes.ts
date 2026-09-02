import { Router } from "express";

import {
  getEducationController,
  getEducationByIdController,
  createEducationController,
  updateEducationController,
  deleteEducationController,
} from "../controllers/education.controller";

import { validate } from "../middlewares/validate";

import {
  createEducationSchema,
  updateEducationSchema,
} from "../validators/education.validator";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getEducationController);

router.get("/:id", getEducationByIdController);

router.post(
  "/",
  authenticate,
  validate(createEducationSchema),
  createEducationController
);

router.patch(
  "/:id",
  authenticate,
  validate(updateEducationSchema),
  updateEducationController
);

router.delete(
  "/:id",
  authenticate,
  deleteEducationController
);

export default router;