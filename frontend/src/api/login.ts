import { HTTPError } from "ky";

import { authApi } from "./index";
import { ClientError } from "../common/error/ClientError";
import type { LoginResponse } from "@repo/types";

export async function login({
  email,
  password,
  rememberMe,
}: {
  email: string;
  password: string;
  rememberMe: boolean;
}) {
  try {
    const data = await authApi
      .post("auth/sessions", { json: { email, password, rememberMe } })
      .json<LoginResponse>();

    return data;
  } catch (err) {
    if (err instanceof HTTPError) {
      const serverError = err.data;
      throw new ClientError(serverError);
    }

    throw err;
  }
}
