import * as userService from "./user.service";
import { PatchUserSchema } from "../auth/dto/patchUser.dto";
import type { Request, Response } from "express";
import type { User } from "@repo/types";

export const userProfile = async (req: Request, res: Response<User>) => {
  const user = await userService.findUserProfile(req.user.id);

  return res.status(200).json(user);
};

// TODO: Check whether a user with the provided email or phone number already exists before creation.
// If the user exists, throw an error
export const handleUserPatch = async (req: Request, res: Response<User>) => {
  const parsedBody = PatchUserSchema.parse(req.body);
  const updatedUser = await userService.patchUser(parsedBody, req.user.id);
  return res.status(200).json(updatedUser);
};
