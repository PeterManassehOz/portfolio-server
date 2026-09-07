export interface Experience {
  _id: string;
  company: string;
  role: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  current: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateExperienceInput = Omit<
  Experience,
  "_id" | "createdAt" | "updatedAt"
>;

export type UpdateExperienceInput =
  Partial<CreateExperienceInput>;