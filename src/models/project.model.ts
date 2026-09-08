import { Schema, model } from "mongoose";

import type {
  Project,
  ProjectHighlight,
  ProjectImage,
  ProjectShowcase,
} from "../types/projects";

const projectImageSchema = new Schema<ProjectImage>(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },

    publicId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const projectHighlightSchema = new Schema<ProjectHighlight>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const projectShowcaseSchema = new Schema<ProjectShowcase>(
  {
    overview: {
      type: String,
      required: true,
      trim: true,
    },

    whatItDoes: {
      type: [String],
      default: [],
    },

    contribution: {
      type: [String],
      required: true,
      default: [],
    },

    impact: {
      type: [String],
      required: true,
      default: undefined,
    },

    highlights: {
      type: [projectHighlightSchema],
      required: true,
      default: [],
    },

    images: {
      type: [projectImageSchema],
      required: true,
      default: [],
    },
  },
  { _id: false }
);

const projectSchema = new Schema<Project>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: projectImageSchema,
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    technologies: {
      type: [String],
      required: true,
      default: [],
    },

    features: {
      type: [String],
      required: true,
      default: [],
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      required: true,
      enum: [
        "Completed",
        "In Progress",
        "Maintained",
        "Coming Soon",
      ],
    },

    githubUrl: {
      type: String,
      trim: true,
      default: undefined,
    },

    liveUrl: {
      type: String,
      trim: true,
      default: undefined,
    },

    featured: {
      type: Boolean,
      required: true,
      default: false,
    },

    order: {
      type: Number,
      required: true,
      default: 0,
    },

    showcase: {
      type: projectShowcaseSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.index({ featured: 1, order: 1 });

export const ProjectModel = model<Project>("Project", projectSchema);