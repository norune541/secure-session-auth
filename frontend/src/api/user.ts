import { HTTPError } from "ky";

import { protectedApi } from "./index";
import { ClientError } from "../common/error/ClientError";
import type { User } from "@repo/types";

export const getCurrentUserProfile = async () => {
  try {
    const response = await protectedApi.get("users").json<User>();

    return response;
  } catch (err) {
    if (err instanceof HTTPError) {
      const serverResponse = err.data;

      throw new ClientError(serverResponse);
    }

    throw err;
  }
};
