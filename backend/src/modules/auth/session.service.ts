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

export const getUserSession = async (userId: string, sessionId: string) => {
  return await prisma.session.findFirst({
    where: {
      userId: userId,
      id: sessionId,
      expiresAt: { gt: new Date() },
      revoked: false,
    },
    select: {
      id: true,
      ip: true,
      userId: true,
      device: true,
      revoked: true,
      createdAt: true,
      updatedAt: true,
      expiresAt: true,
    },
  });
};

export const getAllSessionActivity = async (userId: string) => {
  return await prisma.sessionActivity.findMany({
    where: {
      session: {
        userId,
      },
    },

    select: {
      id: true,
      sessionId: true,
      type: true,
      createdAt: true,
      session: {
        select: {
          device: true,
          ip: true,
        },
      },
    },
  });
};

export const getSessionActivity = async (sessionId: string, userId: string) => {
  return await prisma.sessionActivity.findFirst({
    where: {
      sessionId,
      session: {
        userId,
      },
    },

    select: {
      id: true,
      sessionId: true,
      type: true,
      createdAt: true,
      session: {
        select: {
          device: true,
          ip: true,
        },
      },
    },
  });
};

export const getUserSessions = async (userId: string) => {
  return await prisma.session.findMany({
    where: {
      userId: userId,
      expiresAt: { gt: new Date() },
      revoked: false,
    },
    select: {
      id: true,
      ip: true,
      userId: true,
      device: true,
      revoked: true,
      createdAt: true,
      updatedAt: true,
      expiresAt: true,
    },
  });
};

export const create = async (
  userId: string,
  rememberMe: boolean,
  metaDto: MetadataDto,
  hash: string,
) => {
  const date = new Date();
  date.setDate(date.getDate() + (rememberMe ? 30 : 1));

  return await prisma.$transaction(async (tx) => {
    const session = await tx.session.create({
      data: {
        ip: metaDto.ip,
        device: metaDto.device,
        refreshToken: hash,
        expiresAt: date,
        user: {
          connect: { id: userId },
        },
      },
      select: {
        id: true,
      },
    });

    await tx.sessionActivity.create({
      data: {
        userId,
        sessionId: session.id,
        type: "CREATED",
      },
    });
    return session;
  });
};

export const update = async (
  sessionId: string,
  userId: string,
  hash: string,
) => {
  return await prisma.$transaction(async (tx) => {
    await tx.session.update({
      where: {
        id: sessionId,
      },
      data: {
        refreshToken: hash,
      },
    });

    await tx.sessionActivity.create({
      data: {
        userId,
        sessionId,
        type: "REFRESHED",
      },
    });
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
export const revokeCurrentSession = async (
  token: string,
  currentSessionId: string,
  userId: string,
) => {
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  await prisma.$transaction(async (tx) => {
    await tx.session.updateMany({
      where: {
        refreshToken: tokenHash,
      },
      data: {
        revoked: true,
      },
    });

    await tx.sessionActivity.create({
      data: {
        userId,
        sessionId: currentSessionId,
        type: "REVOKED",
      },
    });
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
 * @param userId - The id of the current user
 * @returns A promise that resolves once the session has been revoked.
 */
export const revokeSession = async (sessionId: string, userId: string) => {
  prisma.$transaction(async (tx) => {
    await tx.session.updateMany({
      where: {
        id: sessionId,
        userId: userId,
      },
      data: {
        revoked: true,
      },
    });

    await tx.sessionActivity.create({
      data: {
        userId,
        sessionId: sessionId,
        type: "REVOKED",
      },
    });
  });
};
