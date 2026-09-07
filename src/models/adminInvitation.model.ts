import {
  Schema,
  model,
  Types,
} from "mongoose";

export type AdminInvitationStatus =
  | "Pending"
  | "Accepted"
  | "Revoked"
  | "Expired";

export interface AdminInvitation {
  _id: string;

  firstName: string;
  lastName: string;
  email: string;

  tokenHash: string;
  invitedBy: Types.ObjectId;

  status: AdminInvitationStatus;
  expiresAt: Date;
  acceptedAt?: Date;
}

const adminInvitationSchema =
  new Schema<AdminInvitation>(
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
        lowercase: true,
        trim: true,
      },

      tokenHash: {
        type: String,
        required: true,
        unique: true,
        select: false,
      },

      invitedBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
      },

      status: {
        type: String,
        enum: [
          "Pending",
          "Accepted",
          "Revoked",
          "Expired",
        ],
        default: "Pending",
      },

      expiresAt: {
        type: Date,
        required: true,
      },

      acceptedAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  );

export const AdminInvitationModel =
  model<AdminInvitation>(
    "AdminInvitation",
    adminInvitationSchema
  );