import { Router } from "express";

import healthRoutes from "./health.routes.js";
import projectsRoutes from "./projects.routes.js";
import aboutRoutes from "./about.routes.js";
import achievementsRoutes from "./achievements.routes.js";
import contactRoutes from "./contact.routes.js";
import educationRoutes from "./education.routes.js";
import experienceRoutes from "./experience.routes.js";
import heroRoutes from "./hero.routes.js";
import authRoutes from "./auth.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import activityRoutes from "./activity.routes.js";

const router = Router();

router.use(healthRoutes);
router.use("/contact", contactRoutes);
router.use("/dashboard", dashboardRoutes);

router.use("/projects", projectsRoutes);

router.use("/about", aboutRoutes);

router.use("/achievements", achievementsRoutes);

router.use("/education", educationRoutes);

router.use("/experience", experienceRoutes);

router.use("/activity", activityRoutes);

router.use("/hero", heroRoutes);

router.use("/auth", authRoutes);

export default router;