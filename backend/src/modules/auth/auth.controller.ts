import { UAParser } from "ua-parser-js";

import { LoginSchema } from "./dto/login.dto";
import { MetadataSchema } from "./dto/metadata.dto";
import { TokenSchema } from "./dto/token.dto";
import { uuidSchema } from "./dto/uuid.dto";
import { SignupSchema } from "./dto/signup.dto";
import { ResetPasswordSchema } from "./dto/resetPassword";

import { env } from "../../config/env";
import * as authService from "./auth.service";
import * as sessionsService from "./session.service";
import { ApiError } from "../../common/errors/ApiError";
import type { Request, Response } from "express";
import type {
  AllSessionsResponse,
  Session,
  AuthResponse,
  RefreshSessionResponse,
} from "@repo/types";

export const login = async (req: Request, res: Response<AuthResponse>) => {
  const ua = UAParser(req.headers["user-agent"]);

  const rawMetadata = {
    ip: req.ip,
    device: `${ua.browser.name} on ${ua.os.name}`,
  };

  const parsedBody = LoginSchema.parse(req.body);
  const parsedMetadata = MetadataSchema.parse(rawMetadata);

  const { accessToken, refreshToken } = await authService.authenticateUser(
    parsedBody,
    parsedMetadata,
  );

  res.cookie("refreshToken", refreshToken, {
    maxAge: parsedBody.rememberMe ? 30 * 24 * 60 * 60 * 1000 : undefined,
    sameSite: "strict",
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    path: "/",
  });

  return res.status(200).json({ accessToken });
};

export const signup = async (req: Request, res: Response<AuthResponse>) => {
  const ua = UAParser(req.headers["user-agent"]);

  const rawMetadata = {
    ip: req.ip,
    device: `${ua.browser.name} on ${ua.os.name}`,
  };

  const parsedMetadata = MetadataSchema.parse(rawMetadata);
  const parsedBody = SignupSchema.parse(req.body);

  const { refreshToken, accessToken } = await authService.signUser(
    parsedBody,
    parsedMetadata,
  );

  res.cookie("refreshToken", refreshToken, {
    maxAge: parsedBody.rememberMe ? 30 * 24 * 60 * 60 * 1000 : undefined,
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

export const handleRefresh = async (
  req: Request,
  res: Response<RefreshSessionResponse>,
) => {
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

export const handlePasswordRefresh = async (req: Request, res: Response) => {
  const parsedPasswords = ResetPasswordSchema.parse(req.body);
  await authService.resetPassword(req.user.id, parsedPasswords);

  return res.sendStatus(204);
};

export const getAllUserSessions = async (
  req: Request,
  res: Response<AllSessionsResponse>,
) => {
  const sessions = await sessionsService.getUserSessions(req.user.id);

  return res.status(200).json({
    sessions,
    currentSession: req.user.sessionId,
  });
};

export const getUserSession = async (
  req: Request,
  res: Response<Session & { currentSessionId: boolean }>,
) => {
  const parsedSessionId = uuidSchema.parse(req.params.sessionId);
  const currentSessionId = req.user.sessionId;

  const session = await sessionsService.getUserSession(
    req.user.id,
    parsedSessionId,
  );

  if (!session) {
    throw new ApiError("Session not found", 404);
  }

  return res
    .status(200)
    .json({ ...session, currentSessionId: session.id === currentSessionId });
};

export const revokeSession = async (req: Request, res: Response) => {
  const rawSessionId = req.params.sessionId;
  const sessionId = uuidSchema.parse(rawSessionId);

  await sessionsService.revokeSession(sessionId, req.user.id);

  return res.sendStatus(204);
};
