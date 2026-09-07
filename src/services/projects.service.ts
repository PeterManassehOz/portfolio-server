import { ProjectModel } from "../models/project.model.js";

import type { Project } from "../types/projects.js";

import { AppError } from "../utils/app-error.js";

export const getProjects =
  async (): Promise<Project[]> => {
    return ProjectModel.find()
      .sort({ order: 1 })
      .lean<Project[]>()
      .exec();
  };

export const getFeaturedProjects =
  async (): Promise<Project[]> => {
    return ProjectModel.find({
      featured: true,
    })
      .sort({ order: 1 })
      .lean<Project[]>()
      .exec();
  };

export const getProjectBySlug = async (
  slug: string
): Promise<Project> => {
  const project =
    await ProjectModel.findOne({
      slug: slug.toLowerCase(),
    })
      .lean<Project>()
      .exec();

  if (!project) {
    throw new AppError(
      "Project not found",
      404
    );
  }

  return project;
};

export const createProject = async (
  projectData: Project
): Promise<Project> => {
  const existingProject =
    await ProjectModel.findOne({
      slug: projectData.slug,
    })
      .lean()
      .exec();

  if (existingProject) {
    throw new AppError(
      "A project with this slug already exists",
      409
    );
  }

  const project =
    await ProjectModel.create(
      projectData
    );

  return project.toObject() as Project;
};

export const updateProject = async (
  slug: string,
  projectData: Partial<Project>
): Promise<Project> => {
  const project =
    await ProjectModel.findOneAndUpdate(
      {
        slug: slug.toLowerCase(),
      },
      projectData,
      {
        new: true,
        runValidators: true,
      }
    )
      .lean<Project>()
      .exec();

  if (!project) {
    throw new AppError(
      "Project not found",
      404
    );
  }

  return project;
};

export const deleteProject = async (
  slug: string
): Promise<Project> => {
  const project =
    await ProjectModel.findOneAndDelete({
      slug: slug.toLowerCase(),
    })
      .lean<Project>()
      .exec();

  if (!project) {
    throw new AppError(
      "Project not found",
      404
    );
  }

  return project;
};