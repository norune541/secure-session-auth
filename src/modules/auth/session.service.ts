import crypto from "crypto";
import prisma from "../../config/prisma";
import type { MetadataDto } from "./dto/metadata.dto";

/**
 * Validates an opaque refresh token and retrieves the associated session.
 *
 * @description
 * Since the refresh endpoint recieves only an opaque token,
 * the returned session id can be used to rotate the refresh token,
 * while the user data is used to issue a new access token.
 *
 * @param inputToken - Raw refresh token received from the client.
 * @returns The session id and associated user if the token is valid; otherwise `null`.
 */
export const validateRefreshToken = async (inputToken: string) => {
  const inputTokenHash = crypto
    .createHash("sha256")
    .update(inputToken)
    .digest("hex");

  const tokenData = await prisma.session.findUnique({
    where: {
      refreshToken: inputTokenHash,
      revoked: false,
      expiresAt: { gt: new Date() },
    },
    select: {
      id: true,
      user: {
        select: {
          id: true,
          role: true,
        },
      },
    },
  });

  if (!tokenData) {
    return null;
  }

  return {
    user: tokenData.user,
    id: tokenData.id,
  };
};

export const getUserSessions = async (userId: string) => {
  return await prisma.session.findMany({
    where: {
      userId: userId,
      revoked: false,
      expiresAt: { gt: new Date() },
    },
    select: {
      id: true,
      ip: true,
      userAgent: true,
      createdAt: true,
      expiresAt: true,
      revoked: true,
    },
  });
};

export const create = async (
  userId: string,
  metaDto: MetadataDto,
  hash: string,
) => {
  await prisma.session.create({
    data: {
      ip: metaDto.ip,
      userAgent: metaDto.userAgent,
      refreshToken: hash,
      user: {
        connect: { id: userId },
      },
    },
  });
};

export const update = async (id: string, hash: string) => {
  await prisma.session.update({
    where: {
      id: id,
    },
    data: {
      refreshToken: hash,
    },
  });
};

export const revoke = async (token: string) => {
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  await prisma.session.updateMany({
    where: {
      refreshToken: hash,
    },
    data: {
      revoked: true,
    },
  });
};
