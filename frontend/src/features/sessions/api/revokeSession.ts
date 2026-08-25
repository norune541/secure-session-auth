import { HTTPError } from "ky";
import { protectedApi } from "../../../common/api/index";
import { ClientError } from "../../../common/error/ClientError";

export const revokeSession = async (userId: string, sessionId: string) => {
  try {
    await protectedApi.delete(`auth/sessions/${sessionId}/${userId}`);
  } catch (err) {
    if (err instanceof HTTPError) {
      throw new ClientError(err.data);
    }

    throw err;
  }
};
