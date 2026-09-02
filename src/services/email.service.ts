import { BREVO_API_URL, brevoHeaders } from "../config/brevo.js";
import { env } from "../config/env.js";

export interface SendEmailOptions {
  to: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  replyTo?: string;
}

export const sendEmail = async ({
  to,
  subject,
  htmlContent,
  textContent,
  replyTo,
}: SendEmailOptions): Promise<void> => {
  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: brevoHeaders,
    body: JSON.stringify({
      sender: {
        email: env.EMAIL_FROM,
      },

      to: [
        {
          email: to,
        },
      ],

      subject,

      htmlContent,

      ...(textContent && {
        textContent,
      }),

      ...(replyTo && {
        replyTo: {
          email: replyTo,
        },
      }),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();

    throw new Error(
      `Brevo email failed (${response.status}): ${errorBody}`
    );
  }
};