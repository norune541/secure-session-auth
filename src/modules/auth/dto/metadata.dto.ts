import { z } from "zod";

const ipAddrSchema = z.union([
  z.ipv4("Invalid IP format"),
  z.ipv6("Invalid IP format"),
]);

export const MetadataSchema = z.object({
  ip: ipAddrSchema.default("unknown"),
  userAgent: z.string("User agent must be string").trim().default("unknown"),
});

export type MetadataDto = z.infer<typeof MetadataSchema>;
