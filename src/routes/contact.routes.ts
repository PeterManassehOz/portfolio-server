import { Router } from "express";

import {
  createSingleContactMessage,
  getAllContactMessages,
  getSingleContactMessage,
  markSingleContactMessageAsRead,
} from "../controllers/contact.controller";

import { validate } from "../middlewares/validate";

import { createContactSchema } from "../validators/contact.validator";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  validate(createContactSchema),
  createSingleContactMessage
);

router.get(
  "/",
  authenticate,
  getAllContactMessages
);

router.get(
  "/:id",
  authenticate,
  getSingleContactMessage
);

router.patch(
  "/:id/read",
  authenticate,
  markSingleContactMessageAsRead
);


export default router;