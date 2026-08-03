import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string("Password must be a string"),
});

export type LoginDto = z.infer<typeof LoginSchema>;
