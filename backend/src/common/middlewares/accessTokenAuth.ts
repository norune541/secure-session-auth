import jwt from "jsonwebtoken";
import { ApiError } from "../errors/ApiError";
import { env } from "../../config/env";
import type { Request, Response, NextFunction } from "express";
import type { TokenPayload } from "../types/TokenPayload";

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

  const ok = jwt.verify(accessToken!, env.ACCESS_SECRET) as TokenPayload;

  req.user = {
    id: ok.id,
    role: ok.role,
    sessionId: ok.sessionId,
  };

  next();
};
