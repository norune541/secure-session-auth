import { Router } from "express";
import { userProfile, handleUserPatch } from "./user.controller";
import { accessTokenAuth } from "../../common/middlewares/accessTokenAuth";
import { signup, handlePasswordRefresh } from "../auth/auth.controller";

export const userRouter = Router();

userRouter.get("/", accessTokenAuth, userProfile);
userRouter.post("/", signup);
userRouter.patch("/", accessTokenAuth, handleUserPatch);
userRouter.patch("/password", accessTokenAuth, handlePasswordRefresh);
