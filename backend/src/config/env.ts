import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.string().transform(Number),
  ACCESS_SECRET: z.string(),
  NODE_ENV: z.string(),
});

const ok = envSchema.safeParse(process.env);

if (!ok.success) {
  console.error("Invalid environment variables", z.treeifyError(ok.error));
  process.exit(1);
}

export const env = ok.data;
