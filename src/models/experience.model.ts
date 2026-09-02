import { Schema, model } from "mongoose";

import type { Experience } from "../types/experience";

const experienceSchema = new Schema<Experience>(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    employmentType: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    startDate: {
      type: String,
      required: true,
      trim: true,
    },

    endDate: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    responsibilities: {
      type: [String],
      required: true,
      default: [],
    },

    technologies: {
      type: [String],
      required: true,
      default: [],
    },

    current: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const ExperienceModel = model<Experience>(
  "Experience",
  experienceSchema
);