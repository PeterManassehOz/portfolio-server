import { Router } from "express";

import {
  createSingleContactMessage,
  getAllContactMessages,
  getSingleContactMessage,
  markSingleContactMessageAsRead,
} from "../controllers/contact.controller";

import { validate } from "../middlewares/validate";

import { createContactSchema } from "../validators/contact.validator";

const router = Router();

// CREATE contact message
router.post(
  "/",
  validate(createContactSchema),
  createSingleContactMessage
);

// GET all contact messages
router.get("/", getAllContactMessages);

// GET single contact message
router.get("/:id", getSingleContactMessage);

// MARK contact message as read
router.patch("/:id/read", markSingleContactMessageAsRead);

export default router;