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
  ChangePasswordInput,
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
    throw new AppError(
      "An admin with this email already exists",
      409
    );
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
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Reset Your Password</title>
          </head>

          <body
            style="
              margin: 0;
              padding: 0;
              background-color: #f4f7fb;
              font-family: Arial, Helvetica, sans-serif;
              color: #1f2937;
            "
          >
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="background-color: #f4f7fb; padding: 40px 16px;"
            >
              <tr>
                <td align="center">

                  <!-- Main Container -->
                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    style="
                      max-width: 600px;
                      background-color: #ffffff;
                      border-radius: 14px;
                      overflow: hidden;
                      box-shadow: 0 4px 18px rgba(5, 38, 89, 0.08);
                    "
                  >

                    <!-- Header -->
                    <tr>
                      <td
                        style="
                          background-color: #052659;
                          padding: 30px 40px;
                          text-align: center;
                        "
                      >
                        <h1
                          style="
                            margin: 0;
                            color: #ffffff;
                            font-size: 24px;
                            font-weight: 700;
                            letter-spacing: 0.3px;
                          "
                        >
                          Portfolio Admin
                        </h1>

                        <p
                          style="
                            margin: 8px 0 0;
                            color: #c1e8ff;
                            font-size: 14px;
                          "
                        >
                          Secure account management
                        </p>
                      </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px;">

                        <h2
                          style="
                            margin: 0 0 20px;
                            color: #052659;
                            font-size: 24px;
                            line-height: 1.3;
                          "
                        >
                          Reset your password
                        </h2>

                        <p
                          style="
                            margin: 0 0 18px;
                            font-size: 15px;
                            line-height: 1.7;
                            color: #374151;
                          "
                        >
                          Hello ${admin.firstName},
                        </p>

                        <p
                          style="
                            margin: 0 0 18px;
                            font-size: 15px;
                            line-height: 1.7;
                            color: #374151;
                          "
                        >
                          We received a request to reset the password
                          for your <strong>Portfolio Admin</strong> account.
                        </p>

                        <p
                          style="
                            margin: 0 0 28px;
                            font-size: 15px;
                            line-height: 1.7;
                            color: #374151;
                          "
                        >
                          If you made this request, click the button
                          below to create a new password.
                        </p>

                        <!-- CTA -->
                        <table
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          border="0"
                        >
                          <tr>
                            <td align="center">
                              <a
                                href="${resetUrl}"
                                style="
                                  display: inline-block;
                                  background-color: #052659;
                                  color: #ffffff;
                                  text-decoration: none;
                                  font-size: 15px;
                                  font-weight: 600;
                                  padding: 14px 28px;
                                  border-radius: 8px;
                                "
                              >
                                Reset Password
                              </a>
                            </td>
                          </tr>
                        </table>

                        <!-- Expiration Notice -->
                        <table
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          border="0"
                          style="
                            margin-top: 30px;
                            background-color: #f0f7ff;
                            border-left: 4px solid #7da0ca;
                            border-radius: 6px;
                          "
                        >
                          <tr>
                            <td
                              style="
                                padding: 14px 16px;
                                font-size: 14px;
                                line-height: 1.6;
                                color: #374151;
                              "
                            >
                              <strong>Security notice:</strong>
                              This password reset link will expire
                              in <strong>1 hour</strong>.
                            </td>
                          </tr>
                        </table>

                        <p
                          style="
                            margin: 28px 0 0;
                            font-size: 14px;
                            line-height: 1.7;
                            color: #6b7280;
                          "
                        >
                          If you did not request a password reset,
                          no action is required. Your account remains
                          secure and you can safely ignore this email.
                        </p>

                        <p
                          style="
                            margin: 28px 0 0;
                            font-size: 15px;
                            line-height: 1.6;
                            color: #374151;
                          "
                        >
                          Regards,<br />
                          <strong>Portfolio Admin</strong>
                        </p>

                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td
                        style="
                          background-color: #f8fafc;
                          padding: 24px 40px;
                          text-align: center;
                          border-top: 1px solid #e5e7eb;
                        "
                      >
                        <p
                          style="
                            margin: 0;
                            font-size: 12px;
                            line-height: 1.6;
                            color: #9ca3af;
                          "
                        >
                          This is an automated security email.
                          Please do not reply to this message.
                        </p>

                        <p
                          style="
                            margin: 8px 0 0;
                            font-size: 12px;
                            color: #9ca3af;
                          "
                        >
                          © ${new Date().getFullYear()} Portfolio Admin
                        </p>
                      </td>
                    </tr>

                  </table>

                </td>
              </tr>
            </table>
          </body>
        </html>
      `,

      textContent: `
      Portfolio Admin
      Secure account management

      Reset your password

      Hello ${admin.firstName},

      We received a request to reset the password for your Portfolio Admin account.

      If you made this request, use the link below to create a new password:

      ${resetUrl}

      Security notice:
      This password reset link will expire in 1 hour.

      If you did not request a password reset, no action is required. Your account remains secure and you can safely ignore this email.

      Regards,
      Portfolio Admin

      This is an automated security email.
      © ${new Date().getFullYear()} Portfolio Admin
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


export const getCurrentAdmin = async (
  adminId: string
): Promise<LoginResponse["admin"]> => {
  const admin = await AdminModel.findById(adminId)
    .select("_id firstName lastName email role")
    .exec();

  if (!admin) {
    throw new AppError(
      "Admin account not found",
      404
    );
  }

  return {
    id: admin._id.toString(),
    firstName: admin.firstName,
    lastName: admin.lastName,
    email: admin.email,
    role: admin.role,
  };
};

export const changePassword = async (
  adminId: string,
  input: ChangePasswordInput
): Promise<void> => {
  const admin =
    await AdminModel.findById(adminId)
      .select("+password");

  if (!admin) {
    throw new AppError(
      "Admin account not found",
      404
    );
  }

  const isCurrentPasswordValid =
    await comparePassword(
      input.currentPassword,
      admin.password
    );

  if (!isCurrentPasswordValid) {
    throw new AppError(
      "Current password is incorrect",
      400
    );
  }

  const hashedPassword =
    await hashPassword(
      input.newPassword
    );

  admin.password = hashedPassword;

  await admin.save();
};