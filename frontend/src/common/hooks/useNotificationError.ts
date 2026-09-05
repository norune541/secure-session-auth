import { App } from "antd";
import { ClientError } from "../error/ClientError";

export function useNotificationError() {
  const { notification } = App.useApp();

  const handleError = (err: unknown) => {
    if (err instanceof ClientError) {
      notification.error({
        type: "error",
        description: err.message,
      });
    }
  };
  return { handleError };
}
