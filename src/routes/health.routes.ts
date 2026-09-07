import { Router } from "express";

import {
  getHealth,
  getEmailNetworkHealth,
} from "../controllers/health.controller.js";

const router = Router();

router.get("/health", getHealth);
router.get("/health/email-network", getEmailNetworkHealth);

export default router;