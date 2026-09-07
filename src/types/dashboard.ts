export interface DashboardStats {
  projects: number;
  experience: number;
  achievements: number;
  messages: number;
  unreadMessages: number;
}

export interface DashboardRecentActivity {
  type:
    | "hero"
    | "about"
    | "experience"
    | "education"
    | "project"
    | "achievement"
    | "message";

  title: string;
  description: string;
  occurredAt: Date;
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivity: DashboardRecentActivity[];
}