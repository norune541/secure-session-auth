import prisma from "../../config/prisma";
import { ApiError } from "../../shared/errors/ApiError";

export const findUserProfile = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
    },
  });

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  return user;
};

export const findUserByEmail = async (
  email: string,
): Promise<{ id: string; role: string; password: string } | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      role: true,
      password: true,
    },
  });

  return user;
};
