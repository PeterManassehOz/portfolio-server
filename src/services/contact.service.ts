import { ContactModel } from "../models/contact.model";
import type { ContactMessage } from "../types/contact";

export interface CreateContactInput {
  name: string;
  email: string;
  message: string;
}

export const createContactMessage = async (
  contactData: CreateContactInput
): Promise<ContactMessage> => {
  const contactMessage = await ContactModel.create(contactData);

  return contactMessage.toObject() as ContactMessage;
};

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  return ContactModel.find()
    .sort({ createdAt: -1 })
    .lean<ContactMessage[]>()
    .exec();
};

export const getContactMessageById = async (
  id: string
): Promise<ContactMessage | null> => {
  return ContactModel.findById(id)
    .lean<ContactMessage>()
    .exec();
};

export const markContactMessageAsRead = async (
  id: string
): Promise<ContactMessage | null> => {
  return ContactModel.findByIdAndUpdate(
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
};