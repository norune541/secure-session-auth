import { Router } from "express";
import {
  login,
  logout,
  handleRefresh,
  getAllUserSessions,
  getUserSession,
  revokeSession,
} from "./auth.controller";
import { accessTokenAuth } from "../../common/middlewares/accessTokenAuth";
import { isAuthorOrAdmin } from "../../common/middlewares/isAuthorOrAdmin";

export const authRouter = Router();

authRouter.post("/sessions", login);
authRouter.get("/sessions", accessTokenAuth, getAllUserSessions);
authRouter.get(
  "/sessions/:sessionId/:userId",
  accessTokenAuth,
  isAuthorOrAdmin,
  getUserSession,
);
authRouter.delete("/sessions", logout);
authRouter.delete(
  "/sessions/:sessionId/:userId",
  accessTokenAuth,
  isAuthorOrAdmin,
  revokeSession,
);
authRouter.post("/sessions/refresh", handleRefresh);
