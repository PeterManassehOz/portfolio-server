import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
  token: z
    .string()
    .min(1, "Reset token is required"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required"),

    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
  })
  .refine(
    (data) => data.currentPassword !== data.newPassword,
    {
      message:
        "New password must be different from your current password",
      path: ["newPassword"],
    }
  );

  export const createAdminInvitationSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters"),

  email: z.email("Invalid email address"),
});

export const acceptAdminInvitationSchema = z.object({
  token: z
    .string()
    .min(1, "Invitation token is required"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});