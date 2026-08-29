import { useNavigate } from "react-router-dom";
import { message } from "antd";

import { signup } from "../api/signup";
import { ClientError } from "../../../common/error/ClientError";
import type { Signup } from "../types/Signup";

export function useSignup() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const executeSignup = async (values: Signup) => {
    try {
      const response = await signup(values);

      navigate("/");

      return response;
    } catch (err) {
      if (err instanceof ClientError) {
        messageApi.open({
          type: "error",
          content: err.message,
        });
      }
    }
  };

  return {
    executeSignup,
    contextHolder,
  };
}
