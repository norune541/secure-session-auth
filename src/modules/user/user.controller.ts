import * as userService from "./user.service";
import type { Request, Response } from "express";

export const userProfile = async (req: Request, res: Response) => {
  const user = await userService.findUserProfile(req.user.id);

  return res.status(200).json(user);
};
