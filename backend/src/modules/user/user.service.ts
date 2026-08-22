import prisma from "../../config/prisma";
import { ApiError } from "../../common/errors/ApiError";

export const findUserProfile = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
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
