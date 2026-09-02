import { z } from "zod";

export const createEducationSchema = z.object({
  institution: z.string().trim().min(1),
  qualification: z.string().trim().min(1),
  field: z.string().trim().min(1),
  startDate: z.string().trim().min(1),
  endDate: z.string().trim().min(1),
  description: z.string().trim().min(1).optional(),
});

export const updateEducationSchema =
  createEducationSchema.partial();