import path from "node:path";
import fs from "node:fs";

import mongoose from "mongoose";

import { env } from "../src/config/env";
import { ProjectModel } from "../src/models/project.model";

import {
  uploadImage,
  type CloudinaryImage,
} from "../src/services/cloudinary.service";

import {
  projects,
  type SeedProject,
} from "./data/projects";

import {
  projectShowcase,
  type ProjectShowcase,
} from "./data/projectShowcase";

/*
 * ============================================================
 * PROJECT IMAGE DIRECTORY
 * ============================================================
 *
 * The seed script runs from portfolio-server.
 *
 * Therefore:
 *
 * portfolio/
 * ├── portfolio-fe/
 * │   └── public/
 * │       └── images/
 * │           └── projects/
 * │
 * └── portfolio-server/
 *     └── scripts/
 *         └── seed-projects.ts
 *
 * We resolve the frontend image directory from the
 * portfolio-server working directory.
 */
const projectsImageDirectory = path.resolve(
  process.cwd(),
  "../portfolio-fe/public/images/projects"
);

/*
 * ============================================================
 * GET LOCAL IMAGE FILE PATH
 * ============================================================
 *
 * Example:
 *
 * "/images/projects/regwatch.png"
 *
 * becomes:
 *
 * "/home/peter_manasseh_oz/portfolio/portfolio-fe/public/images/projects/regwatch.png"
 */
const getImageFilePath = (
  imagePath: string
): string => {
  const fileName = path.basename(imagePath);

  return path.join(
    projectsImageDirectory,
    fileName
  );
};

/*
 * ============================================================
 * VERIFY IMAGE EXISTS
 * ============================================================
 */
const verifyImageExists = (
  imagePath: string
): string => {
  const filePath = getImageFilePath(imagePath);

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Project image not found: ${filePath}`
    );
  }

  return filePath;
};

/*
 * ============================================================
 * UPLOAD PROJECT IMAGE
 * ============================================================
 *
 * Takes a local frontend image path and uploads it
 * to Cloudinary.
 *
 * Example Cloudinary folder:
 *
 * portfolio/projects/regwatch
 *
 * The returned object has the shape:
 *
 * {
 *   url: "...",
 *   publicId: "..."
 * }
 */
const uploadProjectImage = async (
  imagePath: string,
  projectSlug: string
): Promise<CloudinaryImage> => {
  const filePath = verifyImageExists(imagePath);

  return uploadImage(
    filePath,
    `portfolio/projects/${projectSlug}`
  );
};

/*
 * ============================================================
 * GET PROJECT SHOWCASE
 * ============================================================
 */
const buildProjectShowcase = (
  project: SeedProject
): ProjectShowcase => {
  const showcase =
    projectShowcase[project.slug];

  if (!showcase) {
    throw new Error(
      `No showcase data found for project: ${project.slug}`
    );
  }

  return showcase;
};

/*
 * ============================================================
 * VERIFY ALL LOCAL IMAGES BEFORE STARTING MIGRATION
 * ============================================================
 *
 * This is important.
 *
 * We don't want the script to upload 20 images and then
 * discover that image #21 doesn't exist.
 *
 * So we check every cover image and every showcase image
 * before connecting to MongoDB or uploading anything.
 */
const verifyAllProjectImages = (): void => {
  console.log(
    "\n🔎 Verifying project images..."
  );

  for (const project of projects) {
    /*
     * Verify cover image
     */
    verifyImageExists(project.image);

    /*
     * Verify showcase exists
     */
    const showcase =
      buildProjectShowcase(project);

    /*
     * Verify every showcase image
     */
    for (const imagePath of showcase.images) {
      verifyImageExists(imagePath);
    }
  }

  console.log(
    "✅ All project images verified successfully"
  );
};

/*
 * ============================================================
 * SEED PROJECTS
 * ============================================================
 */
const seedProjects = async (): Promise<void> => {
  try {
    /*
     * --------------------------------------------------------
     * STEP 1: VERIFY LOCAL IMAGES
     * --------------------------------------------------------
     */
    verifyAllProjectImages();

    /*
     * --------------------------------------------------------
     * STEP 2: CONNECT TO MONGODB
     * --------------------------------------------------------
     */
    console.log(
      "\n🔌 Connecting to MongoDB..."
    );

    await mongoose.connect(
      env.MONGODB_URI
    );

    console.log(
      "✅ Connected to MongoDB"
    );

    console.log(
      `📦 Found ${projects.length} projects to migrate`
    );

    /*
     * --------------------------------------------------------
     * STEP 3: PROCESS EACH PROJECT
     * --------------------------------------------------------
     */
    for (const [
      index,
      project,
    ] of projects.entries()) {
      console.log(
        "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
      );

      console.log(
        `📦 [${index + 1}/${projects.length}] ${project.title}`
      );

      console.log(
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
      );

      /*
       * ------------------------------------------------------
       * GET SHOWCASE DATA
       * ------------------------------------------------------
       */
      const showcase =
        buildProjectShowcase(project);

      /*
       * ------------------------------------------------------
       * UPLOAD COVER IMAGE
       * ------------------------------------------------------
       */
      console.log(
        "\n☁️ Uploading project cover image..."
      );

      const coverImage =
        await uploadProjectImage(
          project.image,
          project.slug
        );

      console.log(
        `✅ Cover uploaded: ${coverImage.publicId}`
      );

      /*
       * ------------------------------------------------------
       * UPLOAD SHOWCASE IMAGES
       * ------------------------------------------------------
       */
      const showcaseImages: CloudinaryImage[] =
        [];

      console.log(
        `\n☁️ Uploading ${showcase.images.length} showcase image(s)...`
      );

      for (const [
        imageIndex,
        imagePath,
      ] of showcase.images.entries()) {
        console.log(
          `   [${imageIndex + 1}/${showcase.images.length}] ${imagePath}`
        );

        const uploadedImage =
          await uploadProjectImage(
            imagePath,
            project.slug
          );

        showcaseImages.push(
          uploadedImage
        );

        console.log(
          `   ✅ ${uploadedImage.publicId}`
        );
      }

      /*
       * ------------------------------------------------------
       * BUILD MONGODB DOCUMENT
       * ------------------------------------------------------
       *
       * Notice:
       *
       * project.image
       * is a STRING local path.
       *
       * coverImage
       * is the Cloudinary object.
       *
       * Therefore MongoDB receives:
       *
       * image: {
       *   url: "...",
       *   publicId: "..."
       * }
       *
       * The same conversion happens for showcase images.
       */
      const projectDocument = {
        id: project.id,

        slug: project.slug,

        title: project.title,

        shortDescription:
          project.shortDescription,

        description:
          project.description,

        image: coverImage,

        category:
          project.category,

        technologies:
          project.technologies,

        features:
          project.features,

        role:
          project.role,

        status:
          project.status,

        ...(project.githubUrl
          ? {
              githubUrl:
                project.githubUrl,
            }
          : {}),

        ...(project.liveUrl
          ? {
              liveUrl:
                project.liveUrl,
            }
          : {}),

        featured:
          project.featured,

        order:
          project.order,

        showcase: {
          overview:
            showcase.overview,

          contribution:
            showcase.contribution,

          ...(showcase.impact
            ? {
                impact:
                  showcase.impact,
              }
            : {}),

          highlights:
            showcase.highlights,

          images:
            showcaseImages,
        },
      };

      /*
       * ------------------------------------------------------
       * UPSERT PROJECT
       * ------------------------------------------------------
       *
       * If the project already exists:
       *     update it.
       *
       * If it does not exist:
       *     create it.
       */
      const savedProject =
        await ProjectModel.findOneAndUpdate(
          {
            id: project.id,
          },

          projectDocument,

          {
            upsert: true,
            new: true,
            runValidators: true,
            setDefaultsOnInsert: true,
          }
        ).exec();

      /*
       * ------------------------------------------------------
       * VERIFY SAVE
       * ------------------------------------------------------
       */
      if (!savedProject) {
        throw new Error(
          `Failed to save project: ${project.title}`
        );
      }

      /*
       * ------------------------------------------------------
       * PROJECT SUCCESS LOG
       * ------------------------------------------------------
       */
      console.log(
        `\n✅ ${project.title} successfully migrated`
      );

      console.log(
        `   ID: ${savedProject.id}`
      );

      console.log(
        `   Slug: ${savedProject.slug}`
      );

      console.log(
        `   Featured: ${savedProject.featured}`
      );

      console.log(
        `   Order: ${savedProject.order}`
      );

      console.log(
        `   Showcase images: ${showcaseImages.length}`
      );
    }

    /*
     * ========================================================
     * MIGRATION SUMMARY
     * ========================================================
     */
    console.log(
      "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    );

    console.log(
      "🎉 PROJECT MIGRATION COMPLETED SUCCESSFULLY"
    );

    console.log(
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    );

    console.log(
      `📦 Projects migrated: ${projects.length}`
    );

    console.log(
      `⭐ Featured projects: ${
        projects.filter(
          (project) => project.featured
        ).length
      }`
    );

    console.log(
      `🖼️ Project images verified: YES`
    );

    console.log(
      `☁️ Cloudinary uploads: COMPLETED`
    );

    console.log(
      `🗄️ MongoDB records: ${projects.length}`
    );
  } catch (error) {
    /*
     * ========================================================
     * ERROR HANDLING
     * ========================================================
     */
    console.error(
      "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    );

    console.error(
      "❌ PROJECT MIGRATION FAILED"
    );

    console.error(
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    );

    if (error instanceof Error) {
      console.error(
        error.message
      );

      if (error.stack) {
        console.error(
          "\nStack trace:"
        );

        console.error(
          error.stack
        );
      }
    } else {
      console.error(
        error
      );
    }

    process.exitCode = 1;
  } finally {
    /*
     * ========================================================
     * CLOSE MONGODB CONNECTION
     * ========================================================
     */
    if (
      mongoose.connection.readyState !== 0
    ) {
      await mongoose.disconnect();

      console.log(
        "\n🔌 MongoDB connection closed"
      );
    }
  }
};

/*
 * ============================================================
 * START SEED
 * ============================================================
 */
seedProjects();