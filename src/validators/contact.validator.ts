import { z } from "zod";

export const createContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must not exceed 100 characters"),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .max(255, "Email must not exceed 255 characters"),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters long")
    .max(5000, "Message must not exceed 5000 characters"),
});