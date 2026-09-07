import type {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  getHero,
  createHero,
  updateHero,
  deleteHero,
  uploadHeroImage,
} from "../services/hero.service.js";


export const getHeroContent = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const hero = await getHero();

    if (!hero) {
      res.status(404).json({
        success: false,
        message: "Hero content not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: hero,
    });
  } catch (error) {
    next(error);
  }
};

export const createHeroContent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message:
          "Profile image is required",
      });

      return;
    }

    const uploadedImage =
      await uploadHeroImage(
        req.file.buffer
      );

    const hero = await createHero({
      ...req.body,
      profileImage:
        uploadedImage.url,
      profileImagePublicId:
        uploadedImage.publicId,
    });

    res.status(201).json({
      success: true,
      message:
        "Hero content created successfully",
      data: hero,
    });
  } catch (error) {
    next(error);
  }
};


export const updateHeroContent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const existingHero =
      await getHero();

    if (!existingHero) {
      res.status(404).json({
        success: false,
        message: "Hero content not found",
      });

      return;
    }

    let profileImageData = {};

    if (req.file) {
      const uploadedImage =
        await uploadHeroImage(
          req.file.buffer
        );

      profileImageData = {
        profileImage:
          uploadedImage.url,
        profileImagePublicId:
          uploadedImage.publicId,
      };
    }

    const hero = await updateHero({
      ...req.body,
      ...profileImageData,
    });

    res.status(200).json({
      success: true,
      message:
        "Hero content updated successfully",
      data: hero,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteHeroContent = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const hero =
      await deleteHero();

    if (!hero) {
      res.status(404).json({
        success: false,
        message: "Hero content not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message:
        "Hero content deleted successfully",
      data: hero,
    });
  } catch (error) {
    next(error);
  }
};