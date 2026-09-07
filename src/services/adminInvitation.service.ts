import crypto from "node:crypto";

import { AdminModel } from "../models/admin.model.js";
import {
  AdminInvitationModel,
} from "../models/adminInvitation.model.js";

import {
  hashPassword,
} from "./auth.service.js";

import { sendEmail } from "./email.service.js";

import { env } from "../config/env.js";
import { AppError } from "../utils/app-error.js";

import type {
  CreateAdminInvitationInput,
  AcceptAdminInvitationInput,
} from "../types/adminInvitation.js";

const INVITATION_EXPIRATION_MS =
  24 * 60 * 60 * 1000;

const generateInvitationToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

const hashInvitationToken = (
  token: string
): string => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};

export const createAdminInvitation =
  async (
    input: CreateAdminInvitationInput,
    invitedBy: string
  ): Promise<void> => {
    const email = input.email
      .toLowerCase()
      .trim();

    const existingAdmin =
      await AdminModel.findOne({
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

    const existingInvitation =
      await AdminInvitationModel.findOne({
        email,
        status: "Pending",
        expiresAt: {
          $gt: new Date(),
        },
      })
        .lean()
        .exec();

    if (existingInvitation) {
      throw new AppError(
        "A pending invitation already exists for this email",
        409
      );
    }

    const rawToken =
      generateInvitationToken();

    const tokenHash =
      hashInvitationToken(rawToken);

    const expiresAt = new Date(
      Date.now() +
        INVITATION_EXPIRATION_MS
    );

    await AdminInvitationModel.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email,
      tokenHash,
      invitedBy,
      status: "Pending",
      expiresAt,
    });

    const invitationUrl =
      `${env.ADMIN_URL}/accept-invitation?token=${rawToken}`;

    try {
      await sendEmail({
        to: email,
        subject:
          "You're invited to Portfolio Admin",
        htmlContent: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <title>Portfolio Admin Invitation</title>
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
                style="
                  background-color: #f4f7fb;
                  padding: 40px 16px;
                "
              >
                <tr>
                  <td align="center">

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
                        box-shadow:
                          0 4px 18px
                          rgba(5, 38, 89, 0.08);
                      "
                    >

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
                            Administration &amp;
                            content management
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 40px;">

                          <h2
                            style="
                              margin: 0 0 20px;
                              color: #052659;
                              font-size: 24px;
                            "
                          >
                            You're invited!
                          </h2>

                          <p
                            style="
                              margin: 0 0 18px;
                              font-size: 15px;
                              line-height: 1.7;
                              color: #374151;
                            "
                          >
                            Hello
                            <strong>
                              ${input.firstName}
                            </strong>,
                          </p>

                          <p
                            style="
                              margin: 0 0 18px;
                              font-size: 15px;
                              line-height: 1.7;
                              color: #374151;
                            "
                          >
                            You have been invited to join
                            the Portfolio Admin dashboard.
                          </p>

                          <p
                            style="
                              margin: 0 0 28px;
                              font-size: 15px;
                              line-height: 1.7;
                              color: #374151;
                            "
                          >
                            Click the button below to
                            accept your invitation and
                            create your admin password.
                          </p>

                          <table
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                          >
                            <tr>
                              <td align="center">
                                <a
                                  href="${invitationUrl}"
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
                                  Accept Invitation
                                </a>
                              </td>
                            </tr>
                          </table>

                          <table
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                            style="
                              margin-top: 30px;
                              background-color: #f0f7ff;
                              border-left:
                                4px solid #7da0ca;
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
                                <strong>
                                  Security notice:
                                </strong>
                                This invitation will
                                expire in
                                <strong>24 hours</strong>.
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
                            If you were not expecting
                            this invitation, you can
                            safely ignore this email.
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
                            <strong>
                              Portfolio Admin
                            </strong>
                          </p>

                        </td>
                      </tr>

                      <tr>
                        <td
                          style="
                            background-color: #f8fafc;
                            padding: 24px 40px;
                            text-align: center;
                            border-top:
                              1px solid #e5e7eb;
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
                            This is an automated
                            invitation email.
                          </p>

                          <p
                            style="
                              margin: 8px 0 0;
                              font-size: 12px;
                              color: #9ca3af;
                            "
                          >
                            © ${new Date().getFullYear()}
                            Portfolio Admin
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
Administration & content management

You're invited!

Hello ${input.firstName},

You have been invited to join the Portfolio Admin dashboard.

Click the link below to accept your invitation and create your admin password:

${invitationUrl}

This invitation will expire in 24 hours.

If you were not expecting this invitation, you can safely ignore this email.

Regards,
Portfolio Admin

© ${new Date().getFullYear()} Portfolio Admin
        `,
      });
    } catch (error) {
      await AdminInvitationModel.deleteOne({
        tokenHash,
      });

      console.error(
        "❌ Admin invitation email failed:",
        error
      );

      throw new AppError(
        "Unable to send invitation email. Please try again later.",
        503
      );
    }
  };

export const acceptAdminInvitation =
  async (
    input: AcceptAdminInvitationInput
  ): Promise<void> => {
    const tokenHash =
      hashInvitationToken(input.token);

    const invitation =
      await AdminInvitationModel.findOne({
        tokenHash,
        status: "Pending",
        expiresAt: {
          $gt: new Date(),
        },
      })
        .select("+tokenHash")
        .exec();

    if (!invitation) {
      throw new AppError(
        "Invalid or expired invitation",
        400
      );
    }

    const existingAdmin =
      await AdminModel.findOne({
        email: invitation.email,
      })
        .lean()
        .exec();

    if (existingAdmin) {
      invitation.status = "Accepted";
      invitation.acceptedAt = new Date();

      await invitation.save();

      throw new AppError(
        "An admin with this email already exists",
        409
      );
    }

    const hashedPassword =
      await hashPassword(input.password);

    await AdminModel.create({
      firstName: invitation.firstName,
      lastName: invitation.lastName,
      email: invitation.email,
      password: hashedPassword,
      role: "Admin",
    });

    invitation.status = "Accepted";
    invitation.acceptedAt = new Date();

    await invitation.save();
  };

  export const getAdminInvitations = async () => {
  const now = new Date();

  // Automatically expire pending invitations
  // whose 24-hour validity period has passed.
  await AdminInvitationModel.updateMany(
    {
      status: "Pending",
      expiresAt: {
        $lt: now,
      },
    },
    {
      $set: {
        status: "Expired",
      },
    }
  );

  const invitations =
    await AdminInvitationModel.find()
      .populate(
        "invitedBy",
        "firstName lastName email"
      )
      .sort({
        createdAt: -1,
      });

  return invitations;
};

export const revokeAdminInvitation = async (
  invitationId: string
): Promise<void> => {
  const invitation =
    await AdminInvitationModel.findById(
      invitationId
    ).exec();

  if (!invitation) {
    throw new AppError(
      "Invitation not found",
      404
    );
  }

  if (invitation.status !== "Pending") {
    throw new AppError(
      "Only pending invitations can be revoked",
      400
    );
  }

  invitation.status = "Revoked";

  await invitation.save();
};


export const resendAdminInvitation = async (
  invitationId: string
): Promise<void> => {
  const invitation =
    await AdminInvitationModel.findById(
      invitationId
    )
      .select("+tokenHash")
      .exec();

  if (!invitation) {
    throw new AppError(
      "Invitation not found",
      404
    );
  }

  if (invitation.status === "Accepted") {
    throw new AppError(
      "This invitation has already been accepted",
      400
    );
  }

  const existingAdmin =
    await AdminModel.findOne({
      email: invitation.email,
    })
      .lean()
      .exec();

  if (existingAdmin) {
    throw new AppError(
      "An admin with this email already exists",
      409
    );
  }

  const previousTokenHash =
    invitation.tokenHash;

  const previousExpiresAt =
    invitation.expiresAt;

  const previousStatus =
    invitation.status;

  const rawToken =
    generateInvitationToken();

  const newTokenHash =
    hashInvitationToken(rawToken);

  const newExpiresAt =
    new Date(
      Date.now() +
        INVITATION_EXPIRATION_MS
    );

  const invitationUrl =
    `${env.ADMIN_URL}/accept-invitation?token=${rawToken}`;

  // Temporarily update the invitation
  // with the new token and expiration.
  invitation.tokenHash =
    newTokenHash;

  invitation.expiresAt =
    newExpiresAt;

  invitation.status =
    "Pending";

  try {
    await invitation.save();

    await sendEmail({
      to: invitation.email,
      subject:
        "Your Portfolio Admin invitation",
      htmlContent: `
        <div style="margin:0;padding:0;background:#020617;font-family:Arial,Helvetica,sans-serif;color:#f8fafc;">
          <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
            <div style="background:#0f172a;border:1px solid #1e293b;border-radius:20px;padding:40px;">

              <div style="margin-bottom:30px;">
                <div style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:14px;background:#2563eb;color:#ffffff;font-size:16px;font-weight:700;">
                  Oz
                </div>
              </div>

              <p style="margin:0 0 10px;color:#60a5fa;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
                Portfolio Admin
              </p>

              <h1 style="margin:0 0 20px;font-size:30px;line-height:1.2;color:#ffffff;">
                Your invitation has been resent
              </h1>

              <p style="margin:0 0 16px;font-size:15px;line-height:1.8;color:#94a3b8;">
                Hello ${invitation.firstName},
              </p>

              <p style="margin:0 0 28px;font-size:15px;line-height:1.8;color:#94a3b8;">
                Your invitation to join the Portfolio Admin dashboard
                has been resent. Click the button below to create your
                administrator account.
              </p>

              <div style="margin:0 0 28px;">
                <a
                  href="${invitationUrl}"
                  style="display:inline-block;padding:14px 22px;border-radius:12px;background:#2563eb;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;"
                >
                  Accept invitation
                </a>
              </div>

              <p style="margin:0 0 10px;font-size:13px;line-height:1.7;color:#64748b;">
                This invitation link expires in 24 hours.
              </p>

              <p style="margin:0;font-size:13px;line-height:1.7;color:#64748b;">
                If you were not expecting this invitation, you can safely ignore this email.
              </p>

            </div>

            <p style="margin:24px 0 0;text-align:center;font-size:12px;color:#475569;">
              Portfolio Admin
            </p>
          </div>
        </div>
      `,
      textContent: `
Hello ${invitation.firstName},

Your invitation to join the Portfolio Admin dashboard has been resent.

Accept your invitation:
${invitationUrl}

This invitation link expires in 24 hours.

If you were not expecting this invitation, you can safely ignore this email.

Regards,
Portfolio Admin
      `,
    });
  } catch (error) {
    // Restore the previous invitation state
    // if either saving or sending the email fails.
    invitation.tokenHash =
      previousTokenHash;

    invitation.expiresAt =
      previousExpiresAt;

    invitation.status =
      previousStatus;

    try {
      await invitation.save();
    } catch (restoreError) {
      console.error(
        "❌ Failed to restore invitation after resend failure:",
        restoreError
      );
    }

    console.error(
      "❌ Admin invitation resend failed:",
      error
    );

    throw new AppError(
      "Unable to resend invitation email. Please try again later.",
      503
    );
  }
};

export const deleteAdmin = async (
  invitationId: string
): Promise<void> => {
  const invitation =
    await AdminInvitationModel.findById(
      invitationId
    )
      .lean()
      .exec();

  if (!invitation) {
    throw new AppError(
      "Invitation record not found",
      404
    );
  }

  if (invitation.status !== "Accepted") {
    throw new AppError(
      "Only accepted administrators can be deleted",
      400
    );
  }

  const admin =
    await AdminModel.findOne({
      email: invitation.email,
    }).exec();

  if (!admin) {
    throw new AppError(
      "Administrator account not found",
      404
    );
  }

  await AdminModel.findByIdAndDelete(
    admin._id
  ).exec();

  await AdminInvitationModel.findByIdAndDelete(
    invitationId
  ).exec();
};