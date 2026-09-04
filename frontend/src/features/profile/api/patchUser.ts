import { HTTPError } from "ky";
import { protectedApi } from "../../../common/api/index";
import { ClientError } from "../../../common/error/ClientError";
import type { ValuesPatchUser } from "../types/ValuesPatchUser";
import type { User } from "@repo/types";

export const patchUser = async (values: ValuesPatchUser) => {
  // TODO: update profile picture
  try {
    const response = await protectedApi
      .patch("users", {
        json: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
        },
      })
      .json<User>();

    return response;
  } catch (err) {
    if (err instanceof HTTPError) {
      const serverResponse = err.data;

      throw new ClientError(serverResponse);
    }

    throw err;
  }
};
