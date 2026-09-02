import { Schema, model } from "mongoose";

import type { About } from "../types/about";

const aboutSchema = new Schema<About>(
  {
    eyebrow: {
      type: String,
      required: true,
      trim: true,
    },

    heading: {
      type: String,
      required: true,
      trim: true,
    },

    introduction: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    background: {
      type: String,
      required: true,
      trim: true,
    },

    basedIn: {
      type: String,
      required: true,
      trim: true,
    },

    availability: {
      type: String,
      required: true,
      trim: true,
    },

    primaryFocus: {
      type: String,
      required: true,
      trim: true,
    },

    coreStack: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AboutModel = model<About>("About", aboutSchema);