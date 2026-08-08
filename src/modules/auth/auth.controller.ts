import { LoginSchema } from "./dto/login.dto";
import { MetadataSchema } from "./dto/metadata.dto";
import { TokenSchema } from "./dto/token.dto";
import { uuidSchema } from "./dto/uuid.dto";
import * as authService from "./auth.service";
import * as sessionsService from "./session.service";
import { env } from "../../config/env";
import type { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  const rawMetadata = {
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  };

  const parsedBody = LoginSchema.parse(req.body);
  const parsedMetadata = MetadataSchema.parse(rawMetadata);

  const { accessToken, refreshToken } = await authService.authenticateUser(
    parsedBody,
    parsedMetadata,
  );

  res.cookie("refreshToken", refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: "strict",
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    path: "/",
  });

  return res.status(200).json({ accessToken });
};

export const logout = async (req: Request, res: Response) => {
  const rawToken = req.cookies?.refreshToken;
  const parsedToken = TokenSchema.parse(rawToken);
  await sessionsService.revokeCurrentSession(parsedToken);

  res.clearCookie("refreshToken", {
    path: "/",
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
  });
  return res.sendStatus(204);
};

export const handleRefresh = async (req: Request, res: Response) => {
  const rawToken = req.cookies?.refreshToken;

  const parsedToken = TokenSchema.parse(rawToken);
  const { accessToken, refreshToken } =
    await authService.refreshSession(parsedToken);

  res.cookie("refreshToken", refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: "strict",
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    path: "/",
  });

  return res.status(200).json({ accessToken });
};

export const getAllUserSessions = async (req: Request, res: Response) => {
  const sessions = await sessionsService.getUserSessions(req.user.id);

  return res.status(200).json(sessions);
};

export const revokeSession = async (req: Request, res: Response) => {
  const rawSessionId = req.params.sessionId;
  const sessionId = uuidSchema.parse(rawSessionId);

  await sessionsService.revokeSession(sessionId);

  return res.sendStatus(204);
};
