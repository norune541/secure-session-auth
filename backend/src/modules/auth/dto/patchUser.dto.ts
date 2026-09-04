import { z } from "zod";

export const PatchUserSchema = z.object({
  firstName: z.optional(
    z
      .string({ error: "Please write your first name!" })
      .trim()
      .min(2, { error: "Please enter at least 2 characters!" }),
  ),
  lastName: z.optional(
    z
      .string({ error: "Please write your last name!" })
      .trim()
      .min(2, { error: "Please enter at least 2 characters!" }),
  ),
  email: z.optional(z.email({ error: "Please write correct email!" })),
  phone: z.optional(z.string({ error: "Please write phone number!" })),
});

export type PatchUserDto = z.infer<typeof PatchUserSchema>;
