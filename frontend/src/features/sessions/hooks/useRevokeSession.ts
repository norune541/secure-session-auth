import { useState } from "react";
import { useNotificationError } from "../../../common/hooks/useNotificationError";
import { revokeSession } from "../api/revokeSession";
import { ClientError } from "../../../common/error/ClientError";

export function useRevokeSession() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { handleError } = useNotificationError();

  const handleRevoke = async ( sessionId: string) => {
    setLoadingId(sessionId);
    try {
      await revokeSession(sessionId);
    } catch (err) {
      if (err instanceof ClientError) {
        handleError(err);
      }
    } finally {
      setLoadingId(null);

      window.location.href = "/sessions";
    }
  };

  return { loadingId, handleRevoke };
}
