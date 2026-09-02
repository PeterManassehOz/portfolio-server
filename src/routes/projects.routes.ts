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

const router = Router();

// GET all projects
router.get("/", getAllProjects);

// GET featured projects
router.get("/featured", getFeatured);

// CREATE project
router.post(
  "/",
  validate(createProjectSchema),
  createSingleProject
);

// UPDATE project
router.patch(
  "/:slug",
  validate(updateProjectSchema),
  updateSingleProject
);

// DELETE project
router.delete(
  "/:slug",
  deleteSingleProject
);

// GET single project
router.get("/:slug", getSingleProject);

export default router;