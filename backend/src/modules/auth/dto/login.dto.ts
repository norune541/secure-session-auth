import { z } from "zod";

export const LoginSchema = z
  .object({
    rememberMe: z.boolean({
      error: "Remember flag must be true or false",
    }),

    login: z
      .string({
        error: "Login must be a string",
      })
      .trim()
      .min(1, {
        error: "Login is required",
      })
      .max(254, {
        error: "Login must be at most 254 characters",
      }),

    password: z
      .string({
        error: "Password must be a string",
      })
      .trim()
      .min(8, {
        error: "Password must be at least 8 characters",
      })
      .max(100, { error: "Password must be no long than 100 characters" }),
  })
  .refine(
    ({ login }) => z.email().safeParse(login).success || login.length > 3,
    {
      error: "Login must be a valid email or phone number",
      path: ["login"],
    },
  );

export type LoginDto = z.infer<typeof LoginSchema>;
