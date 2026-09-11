import { Router } from "express";
import {
  login,
  logout,
  handleRefresh,
  getAllUserSessions,
  getUserSession,
  revokeSession,
  handleAllSessionActivity,
  handleSessionActivity,
} from "./auth.controller";
import { accessTokenAuth } from "../../common/middlewares/accessTokenAuth";

export const authRouter = Router();

authRouter.post("/sessions", login);
authRouter.get("/sessions", accessTokenAuth, getAllUserSessions);
authRouter.get("/sessions/activity", accessTokenAuth, handleAllSessionActivity);
authRouter.get(
  "/sessions/activity/:sessionId",
  accessTokenAuth,
  handleSessionActivity,
);
authRouter.get("/sessions/:sessionId", accessTokenAuth, getUserSession);
authRouter.delete("/sessions", accessTokenAuth, logout);
authRouter.delete("/sessions/:sessionId", accessTokenAuth, revokeSession);
authRouter.post("/sessions/refresh", handleRefresh);
