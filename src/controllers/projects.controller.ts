import type {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  getProjects,
  getFeaturedProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projects.service";

export const getAllProjects = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const projects = await getProjects();

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

export const getFeatured = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const projects = await getFeaturedProjects();

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;

    if (typeof slug !== "string") {
      res.status(400).json({
        success: false,
        message: "Project slug is required",
      });

      return;
    }

    const project = await getProjectBySlug(slug);

    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const createSingleProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const project = await createProject(req.body);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSingleProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;

    if (typeof slug !== "string") {
      res.status(400).json({
        success: false,
        message: "Project slug is required",
      });

      return;
    }

    const project = await updateProject(
      slug,
      req.body
    );

    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSingleProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;

    if (typeof slug !== "string") {
      res.status(400).json({
        success: false,
        message: "Project slug is required",
      });

      return;
    }

    const project = await deleteProject(slug);

    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};