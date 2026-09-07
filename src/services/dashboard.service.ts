import { AboutModel } from "../models/about.model.js";
import { AchievementModel } from "../models/achievement.model.js";
import { ContactModel } from "../models/contact.model.js";
import { EducationModel } from "../models/education.model.js";
import { ExperienceModel } from "../models/experience.model.js";
import { HeroModel } from "../models/hero.model.js";
import { ProjectModel } from "../models/project.model.js";

import type {
  DashboardData,
  DashboardRecentActivity,
} from "../types/dashboard.js";

export const getDashboardData =
  async (): Promise<DashboardData> => {
    const [
      projects,
      experience,
      achievements,
      messages,
      unreadMessages,
    ] = await Promise.all([
      ProjectModel.countDocuments(),
      ExperienceModel.countDocuments(),
      AchievementModel.countDocuments(),
      ContactModel.countDocuments(),
      ContactModel.countDocuments({
        status: "New",
      }),
    ]);

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
        .select("heading introduction updatedAt")
        .lean(),

      ExperienceModel.find()
        .sort({ updatedAt: -1 })
        .limit(5)
        .select("company role createdAt updatedAt")
        .lean(),

      EducationModel.find()
        .sort({ updatedAt: -1 })
        .limit(5)
        .select("institution qualification field createdAt updatedAt")
        .lean(),

      ProjectModel.find()
        .sort({ updatedAt: -1 })
        .limit(5)
        .select("title shortDescription createdAt updatedAt")
        .lean(),

      AchievementModel.find()
        .sort({ updatedAt: -1 })
        .limit(5)
        .select("title description createdAt updatedAt")
        .lean(),

      ContactModel.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name message status createdAt")
        .lean(),
    ]);

    const recentActivity: DashboardRecentActivity[] = [
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
    ]
      .sort(
        (a, b) =>
          b.occurredAt.getTime() -
          a.occurredAt.getTime()
      )
      .slice(0, 5);

    return {
      stats: {
        projects,
        experience,
        achievements,
        messages,
        unreadMessages,
      },

      recentActivity,
    };
  };