import { Router } from "express";

import { getActivity } from "../controllers/activity.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
  "/",
  authenticate,
  getActivity
);

export default router;