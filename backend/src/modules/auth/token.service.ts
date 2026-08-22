import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../../config/env";
import type { User } from "@prisma/client";

export const signAccess = (
  payload: Pick<User, "id" | "role"> & { sessionId: string },
): string => {
  return jwt.sign(
    { id: payload.id, role: payload.role, sessionId: payload.sessionId },
    env.ACCESS_SECRET,
    {
      expiresIn: "1m",
    },
  );
};

export const signRefresh = (): {
  refreshToken: string;
  hash: string;
} => {
  const refreshToken = crypto.randomBytes(32).toString("hex");
  const hash = crypto.createHash("sha256").update(refreshToken).digest("hex");

  return {
    refreshToken,
    hash,
  };
};
