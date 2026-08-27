import { HTTPError } from "ky";

import { authApi } from "../../../common/api/index";
import { ClientError } from "../../../common/error/ClientError";
import type { LoginResponse } from "@repo/types";

export async function login({
  login,
  password,
  rememberMe,
}: {
  login: string;
  password: string;
  rememberMe: boolean;
}) {
  try {
    const data = await authApi
      .post("auth/sessions", { json: { login, password, rememberMe } })
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
