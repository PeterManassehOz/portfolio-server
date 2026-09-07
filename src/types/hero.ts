export interface Hero {
  _id: string;
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  shortBio: string;
  email: string;
  location: string;
  availability: string;
  resumeUrl: string;
  profileImage: string;
  profileImagePublicId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateHeroInput = Omit<Hero, "_id">;

export type UpdateHeroInput = Partial<CreateHeroInput>;