import { useState, useEffect } from "react";
import { getAllUserSessions } from "../api/sessions";
import { ClientError } from "../../../common/error/ClientError";
import { useNotificationError } from "../../../common/hooks/useNotificationError";
import type { AllSessionsResponse } from "@repo/types";

export const useSessions = () => {
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<AllSessionsResponse | null>(null);
  const { handleError } = useNotificationError();

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        const sessions = await getAllUserSessions();
        setSessions(sessions);
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
    sessions,
    loading,
  };
};
