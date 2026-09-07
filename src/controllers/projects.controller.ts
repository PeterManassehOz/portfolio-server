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

import {
  uploadImage,
  deleteImage,
} from "../services/cloudinary.service";

const getProjectUploadedFiles = (
  req: Request
) => {
  const files = req.files as
    | {
        [fieldname: string]: Express.Multer.File[];
      }
    | undefined;

  return {
    mainImage: files?.image?.[0],
    showcaseImages:
      files?.showcaseImages ?? [],
  };
};


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
  const uploadedPublicIds: string[] = [];

  try {
    const {
      mainImage,
      showcaseImages,
    } = getProjectUploadedFiles(req);

    if (!mainImage) {
      res.status(400).json({
        success: false,
        message: "Project image is required",
      });

      return;
    }

    const uploadedMainImage =
      await uploadImage(
        mainImage.buffer,
        "portfolio/projects"
      );

    uploadedPublicIds.push(
      uploadedMainImage.publicId
    );

    const uploadedShowcaseImages =
      await Promise.all(
        showcaseImages.map(
          async (file) => {
            const uploaded =
              await uploadImage(
                file.buffer,
                "portfolio/projects/showcase"
              );

            uploadedPublicIds.push(
              uploaded.publicId
            );

            return uploaded;
          }
        )
      );

    const showcase = {
      ...req.body.showcase,
      images: uploadedShowcaseImages,
    };

    const project =
      await createProject({
        ...req.body,
        image: uploadedMainImage,
        showcase,
      });

    res.status(201).json({
      success: true,
      message:
        "Project created successfully",
      data: project,
    });
  } catch (error) {
    // Clean up Cloudinary files if MongoDB
    // creation fails after successful uploads.
    await Promise.allSettled(
      uploadedPublicIds.map(
        (publicId) =>
          deleteImage(publicId)
      )
    );

    next(error);
  }
};

export const updateSingleProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const newlyUploadedPublicIds: string[] = [];

  try {
    const { slug } = req.params;

    if (typeof slug !== "string") {
      res.status(400).json({
        success: false,
        message: "Project slug is required",
      });

      return;
    }

    const existingProject =
      await getProjectBySlug(slug);

    if (!existingProject) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });

      return;
    }

    const {
      mainImage,
      showcaseImages,
    } = getProjectUploadedFiles(req);

    let uploadedMainImage:
      | {
          url: string;
          publicId: string;
        }
      | undefined;

    if (mainImage) {
      uploadedMainImage =
        await uploadImage(
          mainImage.buffer,
          "portfolio/projects"
        );

      newlyUploadedPublicIds.push(
        uploadedMainImage.publicId
      );
    }

    const uploadedShowcaseImages =
      await Promise.all(
        showcaseImages.map(
          async (file) => {
            const uploaded =
              await uploadImage(
                file.buffer,
                "portfolio/projects/showcase"
              );

            newlyUploadedPublicIds.push(
              uploaded.publicId
            );

            return uploaded;
          }
        )
      );

    const existingShowcaseImages =
      existingProject.showcase?.images ??
      [];

    const showcase =
      req.body.showcase
        ? {
            ...req.body.showcase,
            images: [
              ...existingShowcaseImages,
              ...uploadedShowcaseImages,
            ],
          }
        : undefined;

    const updatedProject =
      await updateProject(slug, {
        ...req.body,
        ...(uploadedMainImage
          ? {
              image: uploadedMainImage,
            }
          : {}),
        ...(showcase
          ? {
              showcase,
            }
          : {}),
      });

    if (!updatedProject) {
      throw new Error(
        "Project could not be updated"
      );
    }

    // Delete the old main image only after
    // the database update succeeds.
    if (
      uploadedMainImage &&
      existingProject.image?.publicId
    ) {
      await deleteImage(
        existingProject.image.publicId
      );
    }

    res.status(200).json({
      success: true,
      message:
        "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    await Promise.allSettled(
      newlyUploadedPublicIds.map(
        (publicId) =>
          deleteImage(publicId)
      )
    );

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

    const project =
      await getProjectBySlug(slug);

    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });

      return;
    }

    const deletedProject =
      await deleteProject(slug);

    if (!deletedProject) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });

      return;
    }

    if (project.image?.publicId) {
      await deleteImage(
        project.image.publicId
      );
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: deletedProject,
    });
  } catch (error) {
    next(error);
  }
};