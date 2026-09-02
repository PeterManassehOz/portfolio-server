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

const router = Router();

// GET hero content
router.get("/", getHeroContent);

// CREATE hero content
router.post(
  "/",
  validate(createHeroSchema),
  createHeroContent
);

// UPDATE hero content
router.patch(
  "/",
  validate(updateHeroSchema),
  updateHeroContent
);

// DELETE hero content
router.delete(
  "/",
  deleteHeroContent
);

export default router;