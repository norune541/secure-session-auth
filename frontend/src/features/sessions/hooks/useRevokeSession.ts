import { useState } from "react";
import { useNotificationError } from "../../../common/hooks/useNotificationError";
import { revokeSession } from "../api/revokeSession";
import { ClientError } from "../../../common/error/ClientError";

export function useRevokeSession() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { handleError } = useNotificationError();

  const handleRevoke = async (userId: string, sessionId: string) => {
    setLoadingId(sessionId);
    try {
      await revokeSession(userId, sessionId);
    } catch (err) {
      if (err instanceof ClientError) {
        handleError(err);
      }
    } finally {
      setLoadingId(null);

      window.location.reload();
    }
  };

  return { loadingId, handleRevoke };
}
