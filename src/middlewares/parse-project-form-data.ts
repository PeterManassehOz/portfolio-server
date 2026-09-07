import type {
  Request,
  Response,
  NextFunction,
} from "express";

const parseJsonField = (
  value: unknown
): unknown => {
  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export const parseProjectFormData = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  if (
    !req.body ||
    typeof req.body !== "object"
  ) {
    next();
    return;
  }

  if (req.body.technologies !== undefined) {
    req.body.technologies =
      parseJsonField(
        req.body.technologies
      );
  }

  if (req.body.features !== undefined) {
    req.body.features =
      parseJsonField(
        req.body.features
      );
  }

  if (req.body.showcase !== undefined) {
    req.body.showcase =
      parseJsonField(
        req.body.showcase
      );
  }

  if (req.body.featured !== undefined) {
    req.body.featured =
      req.body.featured === "true";
  }

  if (req.body.order !== undefined) {
    const parsedOrder = Number(
      req.body.order
    );

    if (!Number.isNaN(parsedOrder)) {
      req.body.order = parsedOrder;
    }
  }

  if (req.body.githubUrl === "") {
    delete req.body.githubUrl;
  }

  if (req.body.liveUrl === "") {
    delete req.body.liveUrl;
  }

  next();
};