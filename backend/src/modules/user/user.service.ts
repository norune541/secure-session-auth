import prisma from "../../config/prisma";
import { ApiError } from "../../common/errors/ApiError";

export const findUserProfile = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phone: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  return user;
};

export const findUserByEmailOrPhone = async (
  email?: string,
  phone?: string,
): Promise<{ id: string; role: string; password: string } | null> => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: email, phone: phone }],
    },
    select: {
      id: true,
      role: true,
      password: true,
    },
  });

  return user;
};
