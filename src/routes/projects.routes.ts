import { Router } from "express";

import {
  getAllProjects,
  getFeatured,
  getSingleProject,
  createSingleProject,
  updateSingleProject,
  deleteSingleProject,
} from "../controllers/projects.controller";

import { validate } from "../middlewares/validate";

import {
  createProjectSchema,
  updateProjectSchema,
} from "../validators/projects.validator";

import { authenticate } from "../middlewares/auth.middleware";

import { uploadProjectImages } from "../middlewares/upload.middleware";

import {
  parseProjectFormData,
} from "../middlewares/parse-project-form-data";

const router = Router();

// GET all projects
router.get("/", getAllProjects);

// GET featured projects
router.get("/featured", getFeatured);

router.post(
  "/",
  authenticate,
  uploadProjectImages.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "showcaseImages",
      maxCount: 10,
    },
  ]),
  parseProjectFormData,
  validate(createProjectSchema),
  createSingleProject
);

router.patch(
  "/:slug",
  authenticate,
  uploadProjectImages.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "showcaseImages",
      maxCount: 10,
    },
  ]),
  parseProjectFormData,
  validate(updateProjectSchema),
  updateSingleProject
);


router.delete(
  "/:slug",
  authenticate,
  deleteSingleProject
);

// GET single project
router.get("/:slug", getSingleProject);

export default router;