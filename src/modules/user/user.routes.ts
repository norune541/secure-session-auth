import { Router } from "express";
import { userProfile } from "./user.controller";
import { accessTokenAuth } from "../../shared/middlewares/accessTokenAuth";

export const userRouter = Router();

userRouter.get("/", accessTokenAuth, userProfile);
