import { Schema, model } from "mongoose";

import type { Education } from "../types/education";

const educationSchema = new Schema<Education>(
  {
    institution: {
      type: String,
      required: true,
      trim: true,
    },

    qualification: {
      type: String,
      required: true,
      trim: true,
    },

    field: {
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
      trim: true,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

export const EducationModel = model<Education>(
  "Education",
  educationSchema
);