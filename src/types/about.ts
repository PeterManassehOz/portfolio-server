export interface About {
  _id: string;
  eyebrow: string;
  heading: string;
  introduction: string;
  description: string;
  background: string;
  basedIn: string;
  availability: string;
  primaryFocus: string;
  coreStack: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateAboutInput = Omit<
  About,
  "_id"
>;

export type UpdateAboutInput =
  Partial<CreateAboutInput>;