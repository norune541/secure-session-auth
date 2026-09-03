import { HTTPError } from "ky";
import { protectedApi } from "../../../common/api";
import { ClientError } from "../../../common/error/ClientError";

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
) => {
  try {
    await protectedApi.patch("users/password", {
      json: { currentPassword, newPassword },
    });
  } catch (err) {
    if (err instanceof HTTPError) {
      throw new ClientError(err.data);
    }

    throw err;
  }
};
