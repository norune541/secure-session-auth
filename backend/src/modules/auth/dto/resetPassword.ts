import { z } from "zod";

export const ResetPasswordSchema = z.object({
  newPassword: z
    .string({ error: "Password must be string!" })
    .trim()
    .min(8, { error: "Password must be at least 8 characters!" })
    .max(100, { error: "Password must be no long than 100 characters" }),

  currentPassword: z
    .string({ error: "Password must be string!" })
    .trim()
    .min(8, { error: "Password must be at least 8 characters!" })
    .max(100, { error: "Password must be no long than 100 characters" }),
});

export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;
