import { ProjectModel } from "../models/project.model";
import type { Project } from "../types/projects";

export const getProjects = async (): Promise<Project[]> => {
  return ProjectModel.find()
    .sort({ order: 1 })
    .lean<Project[]>()
    .exec();
};

export const getFeaturedProjects = async (): Promise<Project[]> => {
  return ProjectModel.find({
    featured: true,
  })
    .sort({ order: 1 })
    .lean<Project[]>()
    .exec();
};

export const getProjectBySlug = async (
  slug: string
): Promise<Project | null> => {
  return ProjectModel.findOne({
    slug: slug.toLowerCase(),
  })
    .lean<Project>()
    .exec();
};

export const createProject = async (
  projectData: Project
): Promise<Project> => {
  const existingProject = await ProjectModel.findOne({
    slug: projectData.slug,
  })
    .lean()
    .exec();

  if (existingProject) {
    throw new Error(
      "A project with this slug already exists"
    );
  }

  const project = await ProjectModel.create(projectData);

  return project.toObject() as Project;
};

export const updateProject = async (
  slug: string,
  projectData: Partial<Project>
): Promise<Project | null> => {
  return ProjectModel.findOneAndUpdate(
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
};

export const deleteProject = async (
  slug: string
): Promise<Project | null> => {
  return ProjectModel.findOneAndDelete({
    slug: slug.toLowerCase(),
  })
    .lean<Project>()
    .exec();
};