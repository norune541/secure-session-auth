import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../api/login";
import { ClientError } from "../../../common/error/ClientError";
import { useNotificationError } from "../../../common/hooks/useNotificationError";
import type { Login } from "../types/Login";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { handleError } = useNotificationError();

  const navigate = useNavigate();

  const handleSubmit = async (values: Login) => {
    setLoading(true);
    try {
      const data = await login({
        login: values.login,
        password: values.password,
        rememberMe: values.remember ?? false,
      });
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/");
    } catch (err) {
      if (err instanceof ClientError) {
        handleError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSubmit,
  };
};
