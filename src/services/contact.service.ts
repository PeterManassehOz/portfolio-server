import { Types } from "mongoose";

import { ContactModel } from "../models/contact.model.js";

import type { ContactMessage } from "../types/contact.js";

import { AppError } from "../utils/app-error.js";

export interface CreateContactInput {
  name: string;
  email: string;
  message: string;
}

export const createContactMessage = async (
  contactData: CreateContactInput
): Promise<ContactMessage> => {
  const contactMessage =
    await ContactModel.create(contactData);

  return contactMessage.toObject() as ContactMessage;
};

export const getContactMessages =
  async (): Promise<ContactMessage[]> => {
    return ContactModel.find()
      .sort({ createdAt: -1 })
      .lean<ContactMessage[]>()
      .exec();
  };

export const getUnreadContactMessageCount =
  async (): Promise<number> => {
    return ContactModel.countDocuments({
      status: "New",
    });
  };

export const getContactMessageById = async (
  id: string
): Promise<ContactMessage> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(
      "Invalid contact message ID",
      400
    );
  }

  const message =
    await ContactModel.findById(id)
      .lean<ContactMessage>()
      .exec();

  if (!message) {
    throw new AppError(
      "Contact message not found",
      404
    );
  }

  return message;
};

export const markContactMessageAsRead = async (
  id: string
): Promise<ContactMessage> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(
      "Invalid contact message ID",
      400
    );
  }

  const message =
    await ContactModel.findByIdAndUpdate(
      id,
      {
        status: "Read",
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .lean<ContactMessage>()
      .exec();

  if (!message) {
    throw new AppError(
      "Contact message not found",
      404
    );
  }

  return message;
};