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

export const authRouter = Router();

authRouter.post("/sessions", login);
authRouter.get("/sessions", accessTokenAuth, getAllUserSessions);
authRouter.get(
  "/sessions/:sessionId",
  accessTokenAuth,
  getUserSession,
);
authRouter.delete("/sessions", logout);
authRouter.delete(
  "/sessions/:sessionId",
  accessTokenAuth,
  revokeSession,
);
authRouter.post("/sessions/refresh", handleRefresh);
