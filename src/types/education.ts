export interface Education {
  _id: string;
  institution: string;
  qualification: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateEducationInput = Omit<Education, "_id">;

export type UpdateEducationInput = Partial<CreateEducationInput>;