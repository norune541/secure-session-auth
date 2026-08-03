import jwt from "jsonwebtoken";
import { z, ZodError } from "zod";
import { ApiError } from "../errors/ApiError";
import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log(err);
  let flattenedZodError;

  switch (true) {
    case err instanceof ApiError:
      return res.status(err.status).json({ error: err.message });

    case err instanceof jwt.JsonWebTokenError:
      return res.status(401).json({ error: err.message });

    case err instanceof ZodError:
      flattenedZodError = z.flattenError(err);

      return res.status(422).json({ error: flattenedZodError });

    case err instanceof SyntaxError:
      return res.status(422).json({ error: "body missing" });

    default:
      return res.status(500).json({ error: "Internal server error" });
  }
};
