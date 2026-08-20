import jwt from "jsonwebtoken";
import { z, ZodError } from "zod";
import { ApiError } from "../errors/ApiError";
import type { ErrorRequestHandler } from "express";
import type { Response } from "express";
import type { BackendError } from "../types/BackendError";

export const errorHandler: ErrorRequestHandler = (
  err,
  _req,
  res: Response<BackendError>,
  _next,
) => {
  console.error(err);
  let flattenedZodError;
  let normalize: string;

  switch (true) {
    case err instanceof ApiError:
      return res
        .status(err.status)
        .json({ error: { type: "API_ERROR", message: err.message } });

    case err instanceof jwt.TokenExpiredError:
      return res
        .status(401)
        .json({ error: { type: "JWT_EXPIRED", message: err.message } });

    case err instanceof jwt.JsonWebTokenError:
      return res
        .status(401)
        .json({ error: { type: "JWT_MALFORMED", message: err.message } });

    case err instanceof ZodError:
      flattenedZodError = z.flattenError(err);

      normalize = (Object.values(flattenedZodError.fieldErrors).flat()[0] ||
        flattenedZodError.formErrors[0] ||
        "Validation failed") as string;

      return res
        .status(422)
        .json({ error: { type: "ZOD_ERROR", message: normalize } });

    default:
      return res
        .status(500)
        .json({
          error: { type: "SERVER_ERROR", message: "Internal server error" },
        });
  }
};
