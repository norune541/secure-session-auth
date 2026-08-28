import { z } from "zod";

export const SignupSchema = z.object({
  email: z.email({ error: "Please write correct email!" }),
  phone: z.string({ error: "Please write phone number!" }),
  password: z
    .string({ error: "Please write your password!" })
    .trim()
    .min(8, { error: "Password must be at least 8 characters!" }),
  firstName: z
    .string({ error: "Please write your first name!" })
    .trim()
    .min(2, { error: "Please enter at least 2 characters!" }),
  lastName: z
    .string({ error: "Please write your last name!" })
    .trim()
    .min(2, { error: "Please enter at least 2 characters!" }),
  rememberMe: z.boolean({ error: "Flag must be true or false!" }),
});

export type SignupDto = z.infer<typeof SignupSchema>;
