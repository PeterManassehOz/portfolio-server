import type { Request, Response, NextFunction } from "express";

import {
  createContactMessage,
  getContactMessages,
  getContactMessageById,
  getUnreadContactMessageCount,
  markContactMessageAsRead,
} from "../services/contact.service";

export const createSingleContactMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const contactMessage = await createContactMessage(req.body);

    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully",
      data: contactMessage,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllContactMessages = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const messages = await getContactMessages();

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

export const getUnreadContactMessages = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const count =
      await getUnreadContactMessageCount();

    res.status(200).json({
      success: true,
      data: {
        count,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleContactMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Contact message ID is required",
      });

      return;
    }

    const message = await getContactMessageById(id);

    if (!message) {
      res.status(404).json({
        success: false,
        message: "Contact message not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

export const markSingleContactMessageAsRead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Contact message ID is required",
      });

      return;
    }

    const message = await markContactMessageAsRead(id);

    if (!message) {
      res.status(404).json({
        success: false,
        message: "Contact message not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Contact message marked as read",
      data: message,
    });
  } catch (error) {
    next(error);
  }
};