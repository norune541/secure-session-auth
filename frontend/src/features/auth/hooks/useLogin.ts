import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

import { login } from "../api/login";
import { ClientError } from "../../../common/error/ClientError";
import type { Values } from "../types/Values";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const handleSubmit = async (values: Values) => {
    setLoading(true);
    try {
      const data = await login({
        email: values.email,
        password: values.password,
        rememberMe: values.remember ?? false,
      });
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/");
    } catch (err) {
      if (err instanceof ClientError) {
        messageApi.open({ type: "error", content: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    contextHolder,
    handleSubmit,
  };
};
