import crypto from "crypto";
import prisma from "../../config/prisma";
import type { MetadataDto } from "./dto/metadata.dto";

/**
 * Validates an opaque refresh token and retrieves the associated session.
 *
 * @description
 * Since the refresh endpoint receives only an opaque token,
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
      expiresAt: { gt: new Date() },
    },
    select: {
      id: true,
      ip: true,
      userId: true,
      device: true,
      revoked: true,
      createdAt: true,
      expiresAt: true,
    },
  });
};

export const create = async (
  userId: string,
  metaDto: MetadataDto,
  hash: string,
) => {
  const sessionId = await prisma.session.create({
    data: {
      ip: metaDto.ip,
      device: metaDto.device,
      refreshToken: hash,
      user: {
        connect: { id: userId },
      },
    },
    select: {
      id: true,
    },
  });
  return sessionId;
};

export const update = async (sessionId: string, hash: string) => {
  await prisma.session.update({
    where: {
      id: sessionId,
    },
    data: {
      refreshToken: hash,
    },
  });
};

/**
 * Revoke the current refresh session by token.
 *
 * @description
 * This is used for logout flows where the client presents
 * an opaque refresh token and the corresponding session should
 * be marked revoked so it can no longer be used.
 *
 * @param token - Raw refresh token received from the client.
 * @returns A promise that resolves when the session has been revoked.
 */
export const revokeCurrentSession = async (token: string) => {
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  await prisma.session.updateMany({
    where: {
      refreshToken: tokenHash,
    },
    data: {
      revoked: true,
    },
  });
};

/**
 * Revoke a specific session belonging to a user.
 *
 * @description
 * Used to invalidate a session by its id for the given user,
 * such as when an admin or the user itself removes a device session.
 *
 * @param sessionId - The id of the current session.
 * @returns A promise that resolves once the session has been revoked.
 */
export const revokeSession = async (sessionId: string) => {
  await prisma.session.updateMany({
    where: {
      id: sessionId,
    },
    data: {
      revoked: true,
    },
  });
};
