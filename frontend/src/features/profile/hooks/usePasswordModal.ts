import { useState } from "react";
import { message } from "antd";
import { changePassword } from "../api/changePassword";
import { ClientError } from "../../../common/error/ClientError";
import type { ValuesChangePassword } from "../types/ValuesChangePassword";

export function usePasswordModal(onClose) {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (values: ValuesChangePassword) => {
    try {
      setLoading(true);
      await changePassword(values.currentPassword, values.newPassword);
      messageApi.open({
        type: "success",
        content: "Password changed!",
      });
      if (onClose) onClose();
    } catch (err) {
      if (err instanceof ClientError) {
        messageApi.open({
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
    handleSubmit,
    contextHolder,
  };
}
