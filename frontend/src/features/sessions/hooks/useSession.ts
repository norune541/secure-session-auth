import { useState, useEffect } from "react";
import { useNotificationError } from "../../../common/hooks/useNotificationError";
import { getUserSession } from "../api/sessions";
import { ClientError } from "../../../common/error/ClientError";
import type { Session } from "@repo/types";

export const useSession = (userId: string, sessionId: string) => {
  const [loading, setLoading] = useState(false);
  const [session, setSessions] = useState<Session | null>(null);
  const { handleError } = useNotificationError();

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        const session = await getUserSession(sessionId, userId);
        setSessions(session);
      } catch (err) {
        if (err instanceof ClientError) handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return {
    session,
    loading,
  };
};
