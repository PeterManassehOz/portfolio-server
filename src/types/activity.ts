export interface Activity {
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