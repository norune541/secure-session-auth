import { z } from "zod";

export const uuidSchema = z.uuid({ error: "Invalid uuid type" });
