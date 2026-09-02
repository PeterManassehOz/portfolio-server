import { z } from "zod";

export const createAchievementSchema = z.object({
  title: z.string().trim().min(1),

  description: z.string().trim().min(1),

  date: z.string().trim().min(1).optional(),

  organization: z.string().trim().min(1).optional(),

  url: z.string().trim().url().optional(),
});

export const updateAchievementSchema =
  createAchievementSchema.partial();