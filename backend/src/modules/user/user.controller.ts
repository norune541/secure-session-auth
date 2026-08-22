import * as userService from "./user.service";
import type { Request, Response } from "express";
import type { User } from "@repo/types";

export const userProfile = async (req: Request, res: Response<User>) => {
  const user = await userService.findUserProfile(req.user.id);

  return res.status(200).json(user);
};
