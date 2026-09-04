import { useState } from "react";
import { patchUser } from "../api/patchUser";
import { message } from "antd";
import { ClientError } from "../../../common/error/ClientError";
import type { ValuesPatchUser } from "../types/ValuesPatchUser";

export const usePatchUser = () => {
  const [loading, setLoading] = useState(false);
  const [apiMessage, contextHolder] = message.useMessage();

  const handleSubmit = async (values: ValuesPatchUser) => {
    try {
      setLoading(true);
      await patchUser(values);
      window.location.href = "/";
    } catch (err) {
      if (err instanceof ClientError) {
        apiMessage.open({
          type: "error",
          content: err.message,
        });
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
