import { z } from "zod";

export const createAboutSchema = z.object({
  eyebrow: z.string().trim().min(1),

  heading: z.string().trim().min(1),

  introduction: z.string().trim().min(1),

  description: z.string().trim().min(1),

  background: z.string().trim().min(1),

  basedIn: z.string().trim().min(1),

  availability: z.string().trim().min(1),

  primaryFocus: z.string().trim().min(1),

  coreStack: z.string().trim().min(1),
});

export const updateAboutSchema = createAboutSchema.partial();