import { useState } from "react";
import { patchUser } from "../api/patchUser";
import { ClientError } from "../../../common/error/ClientError";
import { useNotificationError } from "../../../common/hooks/useNotificationError";
import type { ValuesPatchUser } from "../types/ValuesPatchUser";

export const usePatchUser = () => {
  const [loading, setLoading] = useState(false);
  const { handleError } = useNotificationError();

  const handleSubmit = async (values: ValuesPatchUser) => {
    try {
      setLoading(true);
      await patchUser(values);
      window.location.href = "/";
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
