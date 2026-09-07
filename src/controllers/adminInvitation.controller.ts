import type {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  createAdminInvitation,
  acceptAdminInvitation,
  getAdminInvitations,
  revokeAdminInvitation,
  resendAdminInvitation,
  deleteAdmin
} from "../services/adminInvitation.service.js";

export const createAdminInvitationController =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await createAdminInvitation(
        req.body,
        req.admin!.id
      );

      res.status(201).json({
        success: true,
        message:
          "Admin invitation sent successfully",
      });
    } catch (error) {
      next(error);
    }
  };

export const acceptAdminInvitationController =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await acceptAdminInvitation(req.body);

      res.status(201).json({
        success: true,
        message:
          "Admin account created successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  export const getAdminInvitationsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const invitations =
      await getAdminInvitations();

    return res.status(200).json({
      success: true,
      message:
        "Admin invitations retrieved successfully.",
      data: invitations,
    });
  } catch (error) {
    next(error);
  }
};


export const revokeAdminInvitationController =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      if (typeof id !== "string") {
        res.status(400).json({
          success: false,
          message: "Invalid invitation ID.",
        });
        return;
      }

      await revokeAdminInvitation(id);

      res.status(200).json({
        success: true,
        message:
          "Admin invitation revoked successfully",
      });
    } catch (error) {
      next(error);
    }
  };


  export const resendAdminInvitationController =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      if (typeof id !== "string") {
        res.status(400).json({
          success: false,
          message: "Invalid invitation ID.",
        });
        return;
      }

      await resendAdminInvitation(id);

      res.status(200).json({
        success: true,
        message:
          "Admin invitation resent successfully",
      });
    } catch (error) {
      next(error);
    }
  };


export const deleteAdminController =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      if (typeof id !== "string") {
        res.status(400).json({
          success: false,
          message:
            "Invalid invitation ID.",
        });
        return;
      }

      await deleteAdmin(id);

      res.status(200).json({
        success: true,
        message:
          "Administrator deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };