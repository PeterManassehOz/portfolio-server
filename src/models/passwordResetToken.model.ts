import { Schema, model, type Types } from "mongoose";

export interface PasswordResetToken {
  _id: string;
  adminId: Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
}

const passwordResetTokenSchema =
  new Schema<PasswordResetToken>(
    {
      adminId: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
        index: true,
      },

      tokenHash: {
        type: String,
        required: true,
        unique: true,
      },

      expiresAt: {
        type: Date,
        required: true,
      },
    },
    {
      timestamps: {
        createdAt: true,
        updatedAt: false,
      },
    }
  );

// MongoDB automatically removes expired reset tokens.
passwordResetTokenSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

export const PasswordResetTokenModel =
  model<PasswordResetToken>(
    "PasswordResetToken",
    passwordResetTokenSchema
  );