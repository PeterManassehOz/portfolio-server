import { Router } from "express";

import {
  getAllExperiences,
  getSingleExperience,
  createNewExperience,
  updateExistingExperience,
  deleteSingleExperience,
} from "../controllers/experience.controller";

import { validate } from "../middlewares/validate";

import {
  createExperienceSchema,
  updateExperienceSchema,
} from "../validators/experience.validator";

const router = Router();

// GET all experiences

router.get("/", getAllExperiences);

// CREATE experience

router.post(
  "/",
  validate(createExperienceSchema),
  createNewExperience
);

// UPDATE experience

router.patch(
  "/:id",
  validate(updateExperienceSchema),
  updateExistingExperience
);

// DELETE experience

router.delete(
  "/:id",
  deleteSingleExperience
);

// GET single experience

router.get("/:id", getSingleExperience);

export default router;