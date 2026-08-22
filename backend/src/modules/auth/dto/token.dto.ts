import { z } from "zod";

export const TokenSchema = z
  .string("Refresh token must be a string")
  .trim()
  .min(1, { error: "Token must be at least 1 character long" });
