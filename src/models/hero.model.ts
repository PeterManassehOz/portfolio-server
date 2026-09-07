import { Schema, model } from "mongoose";

import type { Hero } from "../types/hero";

const heroSchema = new Schema<Hero>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    shortBio: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    availability: {
      type: String,
      required: true,
      trim: true,
    },

    resumeUrl: {
      type: String,
      required: true,
      trim: true,
    },

    profileImage: {
      type: String,
      required: true,
      trim: true,
    },

    profileImagePublicId: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const HeroModel = model<Hero>("Hero", heroSchema);