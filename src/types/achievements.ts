export interface Achievement {
  _id: string;
  title: string;
  description: string;
  date?: string;
  organization?: string;
  url?: string;
}

export type CreateAchievementInput = Omit<Achievement, "_id">;

export type UpdateAchievementInput = Partial<CreateAchievementInput>;