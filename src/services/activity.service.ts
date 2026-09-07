import { AboutModel } from "../models/about.model.js";
import { AchievementModel } from "../models/achievement.model.js";
import { ContactModel } from "../models/contact.model.js";
import { EducationModel } from "../models/education.model.js";
import { ExperienceModel } from "../models/experience.model.js";
import { HeroModel } from "../models/hero.model.js";
import { ProjectModel } from "../models/project.model.js";

import type { Activity } from "../types/activity.js";

export const getAllActivity = async (): Promise<Activity[]> => {
  const [
    recentHero,
    recentAbout,
    recentExperience,
    recentEducation,
    recentProjects,
    recentAchievements,
    recentMessages,
  ] = await Promise.all([
    HeroModel.findOne()
      .sort({ updatedAt: -1 })
      .select("name title updatedAt")
      .lean(),

    AboutModel.findOne()
      .sort({ updatedAt: -1 })
      .select("heading updatedAt")
      .lean(),

    ExperienceModel.find()
      .sort({ updatedAt: -1 })
      .select("company role updatedAt")
      .lean(),

    EducationModel.find()
      .sort({ updatedAt: -1 })
      .select("institution qualification field updatedAt")
      .lean(),

    ProjectModel.find()
      .sort({ updatedAt: -1 })
      .select("title shortDescription updatedAt")
      .lean(),

    AchievementModel.find()
      .sort({ updatedAt: -1 })
      .select("title description updatedAt")
      .lean(),

    ContactModel.find()
      .sort({ createdAt: -1 })
      .select("name message createdAt")
      .lean(),
  ]);

  const activities: Activity[] = [
    ...(recentHero
      ? [
          {
            type: "hero" as const,
            title: "Hero profile updated",
            description: `${recentHero.name} — ${recentHero.title}`,
            occurredAt: recentHero.updatedAt,
          },
        ]
      : []),

    ...(recentAbout
      ? [
          {
            type: "about" as const,
            title: "About section updated",
            description: recentAbout.heading,
            occurredAt: recentAbout.updatedAt,
          },
        ]
      : []),

    ...recentExperience.map((item) => ({
      type: "experience" as const,
      title: `${item.role} at ${item.company}`,
      description: "Experience entry updated",
      occurredAt: item.updatedAt,
    })),

    ...recentEducation.map((item) => ({
      type: "education" as const,
      title: `${item.qualification} at ${item.institution}`,
      description: item.field,
      occurredAt: item.updatedAt,
    })),

    ...recentProjects.map((project) => ({
      type: "project" as const,
      title: project.title,
      description: project.shortDescription,
      occurredAt: project.updatedAt,
    })),

    ...recentAchievements.map((achievement) => ({
      type: "achievement" as const,
      title: achievement.title,
      description: achievement.description,
      occurredAt: achievement.updatedAt,
    })),

    ...recentMessages.map((message) => ({
      type: "message" as const,
      title: `Message from ${message.name}`,
      description: message.message,
      occurredAt: message.createdAt,
    })),
  ];

  return activities.sort(
    (a, b) =>
      b.occurredAt.getTime() -
      a.occurredAt.getTime()
  );
};