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

const router = Router();

router.get("/", getAllAchievements);

router.get("/:id", getSingleAchievement);

router.post(
  "/",
  validate(createAchievementSchema),
  createNewAchievement
);

router.patch(
  "/:id",
  validate(updateAchievementSchema),
  updateExistingAchievement
);

router.delete(
  "/:id",
  removeAchievement
);

export default router;