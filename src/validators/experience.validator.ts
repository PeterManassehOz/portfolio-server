import { z } from "zod";

export const createExperienceSchema = z.object({
  company: z.string().trim().min(1),
  role: z.string().trim().min(1),
  employmentType: z.string().trim().min(1),
  location: z.string().trim().min(1),
  startDate: z.string().trim().min(1),
  endDate: z.string().trim().min(1),
  description: z.string().trim().min(1),

  responsibilities: z
    .array(z.string().trim().min(1))
    .min(1),

  technologies: z
    .array(z.string().trim().min(1))
    .min(1),

  current: z.boolean(),
});

export const updateExperienceSchema =
  createExperienceSchema.partial();