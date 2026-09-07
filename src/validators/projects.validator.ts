import { z } from "zod";

const projectImageSchema = z.object({
  url: z.string().trim().url(),
  publicId: z.string().trim().min(1),
});

const projectHighlightSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
});

const projectShowcaseSchema = z.object({
  overview: z.string().trim().min(1),

  contribution: z
    .array(z.string().trim().min(1))
    .default([]),

  impact: z
    .array(z.string().trim().min(1))
    .optional(),

  highlights: z
    .array(projectHighlightSchema)
    .default([]),

  images: z
    .array(projectImageSchema)
    .default([]),
});

export const createProjectSchema = z.object({
  slug: z.string().trim().min(1).toLowerCase(),

  title: z.string().trim().min(1),

  shortDescription: z
    .string()
    .trim()
    .min(1),

  description: z.string().trim().min(1),

  image: projectImageSchema.optional(),

  category: z.string().trim().min(1),

  technologies: z
    .array(z.string().trim().min(1))
    .default([]),

  features: z
    .array(z.string().trim().min(1))
    .default([]),

  role: z.string().trim().min(1),

  status: z.enum([
    "Completed",
    "In Progress",
    "Maintained",
    "Coming Soon",
  ]),

  githubUrl: z
    .string()
    .trim()
    .url()
    .optional(),

  liveUrl: z
    .string()
    .trim()
    .url()
    .optional(),

  featured: z.boolean().default(false),

  order: z
    .number()
    .int()
    .min(0)
    .default(0),

  showcase: projectShowcaseSchema,
});

export const updateProjectSchema =
  createProjectSchema.partial();