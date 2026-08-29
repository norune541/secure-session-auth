import { authApi } from "../../../common/api";
import { HTTPError } from "ky";
import { ClientError } from "../../../common/error/ClientError";
import type { Signup } from "../types/Signup";
import type { AuthResponse } from "@repo/types";

export async function signup({
  firstName,
  lastName,
  phone,
  email,
  password,
  rememberMe,
}: Signup) {
  try {
    const data = await authApi
      .post("users", {
        json: { firstName, lastName, phone, email, password, rememberMe },
      })
      .json<AuthResponse>();

    return data;
  } catch (err) {
    if (err instanceof HTTPError) {
      throw new ClientError(err.data);
    }

    throw err;
  }
}
