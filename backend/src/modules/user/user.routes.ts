import { Router } from "express";
import { userProfile } from "./user.controller";
import { accessTokenAuth } from "../../common/middlewares/accessTokenAuth";
import { signup } from "../auth/auth.controller";

export const userRouter = Router();

userRouter.get("/", accessTokenAuth, userProfile);
userRouter.post("/", signup);
