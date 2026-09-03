import prisma from "../../config/prisma";
import { ApiError } from "../../common/errors/ApiError";
import type { SignupDto } from "../auth/dto/signup.dto";

export const createUser = async (userDto: SignupDto, hash: string) => {
  return await prisma.user.create({
    data: {
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      email: userDto.email,
      phone: userDto.phone,
      password: hash,
    },
    select: {
      id: true,
      role: true,
    },
  });
};

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

export const findUserByCredentials = async (email: string, phone: string) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { phone }],
    },
  });
  if (user) {
    throw new ApiError("User already exists!", 409);
  }
};

export const findUserByLogin = async (
  login: string,
): Promise<{ id: string; role: string; password: string } | null> => {
  return await prisma.user.findFirst({
    where: {
      OR: [{ email: login }, { phone: login }],
    },
    select: {
      id: true,
      role: true,
      password: true,
    },
  });
};

export const findUserPasswordHashById = async (userId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      password: true,
    },
  });

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  return user;
};

export const updatePasswordHash = async (
  userId: string,
  newPasswordHash: string,
) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: newPasswordHash,
    },
  });
};
