import { z } from "zod";

export const createHeroSchema = z.object({
  name: z.string().trim().min(1),

  firstName: z.string().trim().min(1),

  lastName: z.string().trim().min(1),

  title: z.string().trim().min(1),

  shortBio: z.string().trim().min(1),

  email: z.string().trim().email(),

  location: z.string().trim().min(1),

  availability: z.string().trim().min(1),

  resumeUrl: z.string().trim().min(1),

  profileImage: z.string().trim().min(1).optional(),
});

export const updateHeroSchema =
  createHeroSchema.partial();