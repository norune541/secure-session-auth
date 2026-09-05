import { useState } from "react";
import { message } from "antd";
import { changePassword } from "../api/changePassword";
import { ClientError } from "../../../common/error/ClientError";
import { useNotificationError } from "../../../common/hooks/useNotificationError";
import type { ValuesChangePassword } from "../types/ValuesChangePassword";

export function usePasswordModal(onClose) {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { handleError } = useNotificationError();

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
        handleError(err);
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
