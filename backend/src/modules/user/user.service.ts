import prisma from "../../config/prisma";
import { ApiError } from "../../common/errors/ApiError";
import type { SignupDto } from "../auth/dto/signup.dto";
import type { PatchUserDto } from "../auth/dto/patchUser.dto";

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

/**
 * Verifies if the email or phone is already taken, throwing a 409 ApiError on conflict.
 *
 * @param {string} [userId] - Optional user ID determines the context:
 *   - With `userId` (Profile Update / patchUser): Excludes the current user from the search
 *     so they can keep their own credentials without triggering a conflict.
 *   - Without `userId` (Registration / signup): Searches all records since a new user
 *     does not have an ID yet.
 *
 * @throws {ApiError} 409 - If credentials belong to another user.
 **/
export const findUserByCredentials = async (
  userId?: string,
  email?: string,
  phone?: string,
) => {
  let user;

  if (userId) {
    user = await prisma.user.findFirst({
      where: {
        id: {
          not: userId,
        },
        OR: [{ email }, { phone }],
      },
    });
  } else if (!userId) {
    user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });
  }
  if (user?.email === email) {
    throw new ApiError("This email is already taken!", 409);
  } else if (user?.phone === phone) {
    throw new ApiError("This phone is already taken!", 409);
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

export const patchUser = async (userDto: PatchUserDto, userId: string) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      email: userDto.email,
      phone: userDto.phone,
    },
    select: {
      id: true,
      role: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  });
};
