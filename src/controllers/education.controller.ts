import type { Request, Response } from "express";

import {
  getEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../services/education.service";


export async function getEducationController(
  _req: Request,
  res: Response
) {
  try {
    const education = await getEducation();

    return res.status(200).json({
      success: true,
      data: education,
    });
  } catch (error) {
    console.error("Failed to fetch education:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch education",
    });
  }
}

export async function getEducationByIdController(
  req: Request,
  res: Response
) {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid education ID",
      });
    }

    const education = await getEducationById(id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education record not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: education,
    });
  } catch (error) {
    console.error("Failed to fetch education record:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch education record",
    });
  }
}


export async function createEducationController(
  req: Request,
  res: Response
) {
  try {
    const education = await createEducation(req.body);

    return res.status(201).json({
      success: true,
      message: "Education record created successfully",
      data: education,
    });
  } catch (error) {
    console.error("Failed to create education:", error);

    return res.status(400).json({
      success: false,
      message: "Failed to create education record",
    });
  }
}

export async function updateEducationController(
  req: Request,
  res: Response
) {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid education ID",
      });
    }

    const education = await updateEducation(
      id,
      req.body
    );

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Education record updated successfully",
      data: education,
    });
  } catch (error) {
    console.error("Failed to update education:", error);

    return res.status(400).json({
      success: false,
      message: "Failed to update education record",
    });
  }
}

export async function deleteEducationController(
  req: Request,
  res: Response
) {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid education ID",
      });
    }

    const education = await deleteEducation(id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Education record deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete education:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete education record",
    });
  }
}