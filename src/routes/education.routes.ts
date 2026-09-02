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

const router = Router();

router.get("/", getEducationController);

router.get("/:id", getEducationByIdController);

router.post(
  "/",
  validate(createEducationSchema),
  createEducationController
);

router.patch(
  "/:id",
  validate(updateEducationSchema),
  updateEducationController
);

router.delete(
  "/:id",
  deleteEducationController
);

export default router;