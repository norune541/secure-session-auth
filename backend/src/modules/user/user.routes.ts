import { Router } from "express";
import { userProfile } from "./user.controller";
import { accessTokenAuth } from "../../common/middlewares/accessTokenAuth";

export const userRouter = Router();

userRouter.get("/", accessTokenAuth, userProfile);
