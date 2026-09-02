import { Schema, model } from "mongoose";
import type { Admin } from "../types/admin.js";

const adminSchema = new Schema<Admin>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["Admin"],
      default: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

export const AdminModel = model<Admin>("Admin", adminSchema);