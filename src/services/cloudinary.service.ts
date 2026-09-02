import type { UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary.js";

export interface CloudinaryImage {
  url: string;
  publicId: string;
}

export const uploadImage = async (
  filePath: string,
  folder: string
): Promise<CloudinaryImage> => {
  const result: UploadApiResponse = await cloudinary.uploader.upload(
    filePath,
    {
      folder,
      resource_type: "image",
    }
  );

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};

export const deleteImage = async (
  publicId: string
): Promise<void> => {
  await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
};