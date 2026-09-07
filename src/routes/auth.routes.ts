import { Router } from "express";

import {
  login,
  forgotPasswordController,
  resetPasswordController,
  getMe,
  changePasswordController
} from "../controllers/auth.controller.js";


import {
  createAdminInvitationController,
  acceptAdminInvitationController,
  getAdminInvitationsController,
  revokeAdminInvitationController,
  resendAdminInvitationController,
  deleteAdminController
} from "../controllers/adminInvitation.controller.js";

import { validate } from "../middlewares/validate.js";

import {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  createAdminInvitationSchema,
  acceptAdminInvitationSchema,
} from "../validators/auth.validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.get(
  "/invitations",
  authenticate,
  getAdminInvitationsController
);

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  forgotPasswordController
);

router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  resetPasswordController
);

router.get(
  "/me",
  authenticate,
  getMe
);


router.post(
  "/change-password",
  authenticate,
  validate(changePasswordSchema),
  changePasswordController
);


router.post(
  "/invitations",
  authenticate,
  validate(createAdminInvitationSchema),
  createAdminInvitationController
);

router.post(
  "/invitations/accept",
  validate(acceptAdminInvitationSchema),
  acceptAdminInvitationController
);


router.delete(
  "/invitations/:id",
  authenticate,
  revokeAdminInvitationController
);


router.post(
  "/invitations/:id/resend",
  authenticate,
  resendAdminInvitationController
);

router.delete(
  "/invitations/:id/admin",
  authenticate,
  deleteAdminController
);


export default router;