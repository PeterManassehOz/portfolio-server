import { Router } from "express";

import {
  getHeroContent,
  createHeroContent,
  updateHeroContent,
  deleteHeroContent,
} from "../controllers/hero.controller";

import { validate } from "../middlewares/validate";

import {
  createHeroSchema,
  updateHeroSchema,
} from "../validators/hero.validator";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

// GET hero content
router.get("/", getHeroContent);

// CREATE hero content
router.post(
  "/",
  authenticate,
  validate(createHeroSchema),
  createHeroContent
);

// UPDATE hero content
router.patch(
  "/",
  authenticate,
  validate(updateHeroSchema),
  updateHeroContent
);

// DELETE hero content
router.delete(
  "/",
  authenticate,
  deleteHeroContent
);

export default router;