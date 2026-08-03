import { Router } from "express";
import {
  login,
  logout,
  handleRefresh,
  getAllUserSessions,
} from "./auth.controller";
import { accessTokenAuth } from "../../shared/middlewares/accessTokenAuth";

export const authRouter = Router();

authRouter.post("/sessions", login);
authRouter.post("/sessions/revoke", logout);
authRouter.post("/sessions/refresh", handleRefresh);
authRouter.get("/sessions", accessTokenAuth, getAllUserSessions);
