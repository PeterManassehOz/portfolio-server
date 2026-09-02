import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().int().positive().default(5000),

  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),

  CLIENT_URL: z.url(),

  CLOUDINARY_CLOUD_NAME: z
    .string()
    .min(1, "CLOUDINARY_CLOUD_NAME is required"),

  CLOUDINARY_API_KEY: z
    .string()
    .min(1, "CLOUDINARY_API_KEY is required"),

  CLOUDINARY_API_SECRET: z
    .string()
    .min(1, "CLOUDINARY_API_SECRET is required"),

  EMAIL_FROM: z.email("EMAIL_FROM must be a valid email"),

  BREVO_API_KEY: z
    .string()
    .min(1, "BREVO_API_KEY is required"),

  BREVO_AI_API_KEY: z
    .string()
    .min(1, "BREVO_AI_API_KEY is required"),
});


const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:");

  console.error(z.prettifyError(parsedEnv.error));

  process.exit(1);
}

export const env = parsedEnv.data;