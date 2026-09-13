import { HTTPError } from "ky";
import { protectedApi } from "../../../common/api/index";
import { ClientError } from "../../../common/error/ClientError";
import type { AllActivityResponse, ActivityResponse } from "@repo/types";

export const getAllUserActivity = async () => {
  try {
    const data = await protectedApi
      .get("auth/sessions/activity")
      .json<AllActivityResponse>();
    return data;
  } catch (err) {
    if (err instanceof HTTPError) {
      const serverResponse = err.data;
      throw new ClientError(serverResponse);
    }

    throw err;
  }
};

export const getUserActivity = async (activityId: string) => {
  try {
    const data = await protectedApi
      .get(`auth/sessions/activity/${activityId}`)
      .json<ActivityResponse>();
    return data;
  } catch (err) {
    if (err instanceof HTTPError) {
      const serverResponse = err.data;
      throw new ClientError(serverResponse);
    }

    throw err;
  }
};
