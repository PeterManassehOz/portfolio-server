import nodemailer from "nodemailer";

import { env } from "../config/env.js";
import { AppError } from "../utils/app-error.js";

export interface SendEmailOptions {
  to: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  replyTo?: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export const sendEmail = async ({
  to,
  subject,
  htmlContent,
  textContent,
  replyTo,
}: SendEmailOptions): Promise<void> => {
  try {
    await transporter.sendMail({
      from: env.EMAIL_FROM,

      to,

      subject,

      html: htmlContent,

      ...(textContent && {
        text: textContent,
      }),

      ...(replyTo && {
        replyTo,
      }),
    });
  } catch (error) {
    console.error(
      "❌ Gmail email failed:",
      error
    );

    throw new AppError(
      "Unable to send email. Please try again later.",
      503
    );
  }
};