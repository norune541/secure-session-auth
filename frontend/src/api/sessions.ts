import { HTTPError } from "ky";

import { protectedApi } from "./index";
import { ClientError } from "../common/error/ClientError";
import type { AllSessionsResponse } from "@repo/types";

export const getAllUserSessions = async () => {
  try {
    const data = await protectedApi
      .get("auth/sessions")
      .json<AllSessionsResponse>();
    return data;
  } catch (err) {
    if (err instanceof HTTPError) {
      const serverResponse = err.data;
      throw new ClientError(serverResponse);
    }

    throw err;
  }
};
