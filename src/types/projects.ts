export interface ProjectImage {
  url: string;
  publicId: string;
}

export type ProjectStatus =
  | "Completed"
  | "In Progress"
  | "Maintained"
  | "Coming Soon";

export interface ProjectHighlight {
  title: string;
  description: string;
}

export interface ProjectShowcase {
  overview: string;
  contribution: string[];
  impact?: string[];
  highlights: ProjectHighlight[];
  images: ProjectImage[];
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: ProjectImage;
  category: string;
  technologies: string[];
  features: string[];
  role: string;
  status: ProjectStatus;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  showcase: ProjectShowcase;
}