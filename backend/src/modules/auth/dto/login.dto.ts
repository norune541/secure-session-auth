import { z } from "zod";

export const LoginSchema = z.object({
  rememberMe: z.boolean({ error: "Remember flag must be true or false" }),
  email: z.email("Invalid email format"),
  password: z
    .string("Password must be a string")
    .trim()
    .min(8, { error: "Password must be at least 8 characters" }),
});

export type LoginDto = z.infer<typeof LoginSchema>;
