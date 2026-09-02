import { Schema, model } from "mongoose";

import type { Achievement } from "../types/achievements";

const achievementSchema = new Schema<Achievement>(
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

    date: {
      type: String,
      trim: true,
      default: undefined,
    },

    organization: {
      type: String,
      trim: true,
      default: undefined,
    },

    url: {
      type: String,
      trim: true,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

export const AchievementModel = model<Achievement>(
  "Achievement",
  achievementSchema
);