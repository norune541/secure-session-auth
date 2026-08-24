import { z } from "zod";

export const LoginSchema = z
  .object({
    rememberMe: z.boolean({ error: "Remember flag must be true or false" }),
    email: z.optional(z.email("Invalid email format")),
    phone: z.optional(z.string("Phone must be string")),
    password: z
      .string("Password must be a string")
      .trim()
      .min(8, { error: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.email || data.phone, {
    error: "Either email or phone must be provided",
  });

export type LoginDto = z.infer<typeof LoginSchema>;
