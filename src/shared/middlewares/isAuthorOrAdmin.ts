import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError";

export const isAuthorOrAdmin = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (req.user.id !== req.params.userId && req.user.role !== "admin") {
    throw new ApiError("Forbidden", 403);
  }

  next();
};
