import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { env } from "../config/env.js";
import { AdminModel } from "../models/admin.model.js";

import type {
  Admin,
  CreateAdminInput,
} from "../types/admin.js";

import type {
  AuthenticatedAdmin,
  LoginInput,
  LoginResponse,
} from "../types/auth.js";

import { AppError } from "../utils/app-error.js";
import crypto from "node:crypto";
import { PasswordResetTokenModel } from "../models/passwordResetToken.model.js";
import { sendEmail } from "./email.service.js";
import { ForgotPasswordInput, ResetPasswordInput } from "../types/passwordReset.js";

const SALT_ROUNDS = 12;

const RESET_TOKEN_EXPIRATION_MS =
  60 * 60 * 1000;


const generateResetToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

const hashResetToken = (
  token: string
): string => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};

/**
 * Hash a plain-text password.
 */
export const hashPassword = async (
  password: string
): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compare a plain-text password against a hashed password.
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

/**
 * Create a new admin account.
 */
export const createAdmin = async (
  adminData: CreateAdminInput
): Promise<Admin> => {
  const email = adminData.email.toLowerCase().trim();

  const existingAdmin = await AdminModel.findOne({
    email,
  })
    .lean()
    .exec();

  if (existingAdmin) {
    throw new Error("An admin with this email already exists");
  }

  const hashedPassword = await hashPassword(
    adminData.password
  );

  const admin = await AdminModel.create({
    ...adminData,
    email,
    password: hashedPassword,
    role: adminData.role ?? "Admin",
  });

  return admin.toObject() as Admin;
};

/**
 * Authenticate an admin and generate a JWT access token.
 */
export const loginAdmin = async (
  loginData: LoginInput
): Promise<LoginResponse> => {
  const email = loginData.email.toLowerCase().trim();

  const admin = await AdminModel.findOne({
    email,
  })
    .select("+password")
    .exec();

  if (!admin) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  const passwordIsValid = await comparePassword(
    loginData.password,
    admin.password
  );

  if (!passwordIsValid) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  const tokenPayload: AuthenticatedAdmin = {
    id: admin._id.toString(),
    email: admin.email,
    role: admin.role,
  };

  const tokenOptions: jwt.SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as NonNullable<
      jwt.SignOptions["expiresIn"]
    >,
  };

  const token = jwt.sign(
    tokenPayload,
    env.JWT_SECRET,
    tokenOptions
  );

  return {
    token,
    admin: {
      id: admin._id.toString(),
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      role: admin.role,
    },
  };
};

export const forgotPassword = async (
  input: ForgotPasswordInput
): Promise<void> => {
  const email = input.email
    .toLowerCase()
    .trim();

  const admin = await AdminModel.findOne({
    email,
  })
    .lean()
    .exec();

  // Always return successfully if the account
  // does not exist. This prevents email enumeration.
  if (!admin) {
    return;
  }

  // Remove any previous reset tokens for this admin.
  await PasswordResetTokenModel.deleteMany({
    adminId: admin._id,
  });

  const rawToken = generateResetToken();
  const tokenHash = hashResetToken(rawToken);

  const expiresAt = new Date(
    Date.now() + RESET_TOKEN_EXPIRATION_MS
  );

  await PasswordResetTokenModel.create({
    adminId: admin._id,
    tokenHash,
    expiresAt,
  });

  const resetUrl =
    `${env.ADMIN_URL}/reset-password?token=${rawToken}`;

  try {
    await sendEmail({
      to: admin.email,
      subject: "Reset your portfolio admin password",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Password Reset Request</h2>

          <p>
            Hello ${admin.firstName},
          </p>

          <p>
            We received a request to reset your
            portfolio admin password.
          </p>

          <p>
            Click the button below to create a new password.
          </p>

          <p>
            <a
              href="${resetUrl}"
              style="
                display: inline-block;
                padding: 12px 20px;
                background: #052659;
                color: #ffffff;
                text-decoration: none;
                border-radius: 6px;
              "
            >
              Reset Password
            </a>
          </p>

          <p>
            This link will expire in <strong>1 hour</strong>.
          </p>

          <p>
            If you did not request a password reset,
            you can safely ignore this email.
          </p>

          <p>
            Regards,<br />
            Portfolio Admin
          </p>
        </div>
      `,

      textContent: `
Password Reset Request

Hello ${admin.firstName},

We received a request to reset your portfolio admin password.

Reset your password using this link:

${resetUrl}

This link will expire in 1 hour.

If you did not request a password reset, you can safely ignore this email.

Regards,
Portfolio Admin
      `,
    });
  } catch (error) {
    // Don't leave a usable reset token behind
    // if email delivery failed.
    await PasswordResetTokenModel.deleteOne({
      tokenHash,
    });

    console.error(
      "❌ Password reset email failed:",
      error
    );

    throw new AppError(
      "Unable to send password reset email. Please try again later.",
      503
    );
  }
};


export const resetPassword = async (
  input: ResetPasswordInput
): Promise<void> => {
  const tokenHash = hashResetToken(
    input.token
  );

  const resetToken =
    await PasswordResetTokenModel.findOne({
      tokenHash,
      expiresAt: {
        $gt: new Date(),
      },
    }).exec();

  if (!resetToken) {
    throw new AppError(
      "Invalid or expired password reset token",
      400
    );
  }

  const hashedPassword = await hashPassword(
    input.password
  );

  const admin = await AdminModel.findById(
    resetToken.adminId
  ).exec();

  if (!admin) {
    await PasswordResetTokenModel.deleteOne({
      _id: resetToken._id,
    });

    throw new AppError(
      "Invalid or expired password reset token",
      400
    );
  }

  admin.password = hashedPassword;

  await admin.save();

  // Make the reset token single-use.
  await PasswordResetTokenModel.deleteMany({
    adminId: resetToken.adminId,
  });
};