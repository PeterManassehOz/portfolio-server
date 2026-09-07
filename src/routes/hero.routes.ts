import { Router } from "express";

import {
  getHeroContent,
  createHeroContent,
  updateHeroContent,
  deleteHeroContent,
} from "../controllers/hero.controller.js";

import { validate } from "../middlewares/validate.js";

import {
  createHeroSchema,
  updateHeroSchema,
} from "../validators/hero.validator.js";

import { authenticate } from "../middlewares/auth.middleware.js";

import { uploadImage } from "../middlewares/upload.middleware.js";

const router = Router();

// GET hero content
router.get(
  "/",
  getHeroContent
);

// CREATE hero content
router.post(
  "/",
  authenticate,
  uploadImage.single("profileImage"),
  validate(createHeroSchema),
  createHeroContent
);

// UPDATE hero content
router.patch(
  "/",
  authenticate,
  uploadImage.single("profileImage"),
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