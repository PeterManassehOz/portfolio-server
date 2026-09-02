import { env } from "./env.js";

export const BREVO_API_URL =
  "https://api.brevo.com/v3/smtp/email";

export const brevoHeaders = {
  accept: "application/json",
  "api-key": env.BREVO_API_KEY,
  "content-type": "application/json",
};