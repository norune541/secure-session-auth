import { useNavigate } from "react-router-dom";

import { signup } from "../api/signup";
import { ClientError } from "../../../common/error/ClientError";
import { useNotificationError } from "../../../common/hooks/useNotificationError";
import type { Signup } from "../types/Signup";

export function useSignup() {
  const navigate = useNavigate();
  const { handleError } = useNotificationError();

  const executeSignup = async (values: Signup) => {
    try {
      const response = await signup(values);

      navigate("/");

      return response;
    } catch (err) {
      if (err instanceof ClientError) {
        handleError(err);
      }
    }
  };

  return {
    executeSignup,
  };
}
