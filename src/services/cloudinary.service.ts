import type {
  UploadApiResponse,
} from "cloudinary";

import cloudinary from "../config/cloudinary.js";
import { AppError } from "../utils/app-error.js";


export interface CloudinaryImage {
  url: string;
  publicId: string;
}

export const uploadImage = (
  buffer: Buffer,
  folder: string
): Promise<CloudinaryImage> => {
  return new Promise(
    (resolve, reject) => {
      const uploadStream =
        cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: "image",
          },
          (
            error,
            result
          ) => {
            if (error) {
              console.error(
                "❌ Cloudinary upload failed:",
                error
              );

              reject(
                new AppError(
                  "Unable to upload image. Please try again later.",
                  503
                )
              );

              return;
            }

            if (!result) {
              console.error(
                "❌ Cloudinary upload returned no result"
              );

              reject(
                new AppError(
                  "Unable to upload image. Please try again later.",
                  503
                )
              );

              return;
            }

            const uploadedImage =
              result as UploadApiResponse;

            resolve({
              url: uploadedImage.secure_url,
              publicId:
                uploadedImage.public_id,
            });
          }
        );

      uploadStream.end(buffer);
    }
  );
};

export const deleteImage = async (
  publicId: string
): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(
      publicId,
      {
        resource_type: "image",
      }
    );
  } catch (error) {
    console.error(
      "❌ Cloudinary image deletion failed:",
      error
    );

    throw new AppError(
      "Unable to delete image. Please try again later.",
      503
    );
  }
};