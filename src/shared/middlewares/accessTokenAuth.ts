import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError";
import { env } from "../../config/env";
import type { payload } from "../types/jwt";

export const accessTokenAuth = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError("Missing access token", 400);
  }

  const accessToken = authHeader.split(" ")[1];

  const ok = jwt.verify(accessToken!, env.ACCESS_SECRET) as payload;

  req.user = {
    id: ok.id,
    role: ok.role,
  };

  next();
};
