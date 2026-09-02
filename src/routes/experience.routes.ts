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
import { authenticate } from "../middlewares/auth.middleware.js";


const router = Router();

// GET all experiences

router.get("/", getAllExperiences);

// CREATE experience

router.post(
  "/",
  authenticate,
  validate(createExperienceSchema),
  createNewExperience
);

router.patch(
  "/:id",
  authenticate,
  validate(updateExperienceSchema),
  updateExistingExperience
);

router.delete(
  "/:id",
  authenticate,
  deleteSingleExperience
);

// GET single experience

router.get("/:id", getSingleExperience);

export default router;