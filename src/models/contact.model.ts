import { Schema, model } from "mongoose";

import type { ContactMessage } from "../types/contact";

const contactSchema = new Schema<ContactMessage>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["New", "Read"],
      default: "New",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

contactSchema.index({ createdAt: -1 });

export const ContactModel = model<ContactMessage>(
  "ContactMessage",
  contactSchema
);