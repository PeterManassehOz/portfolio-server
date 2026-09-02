import { Router } from "express";

import {
  getAllAchievements,
  getSingleAchievement,
  createNewAchievement,
  updateExistingAchievement,
  removeAchievement,
} from "../controllers/achievement.controller";

import { validate } from "../middlewares/validate";

import {
  createAchievementSchema,
  updateAchievementSchema,
} from "../validators/achievement.validator";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getAllAchievements);

router.get("/:id", getSingleAchievement);

router.post(
  "/",
  authenticate,
  validate(createAchievementSchema),
  createNewAchievement
);

router.patch(
  "/:id",
  authenticate,
  validate(updateAchievementSchema),
  updateExistingAchievement
);

router.delete(
  "/:id",
  authenticate,
  removeAchievement
);

export default router;