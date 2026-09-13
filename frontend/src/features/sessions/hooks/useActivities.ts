import { useState, useEffect } from "react";
import { getAllUserActivity } from "../api/activityLogs";
import { ClientError } from "../../../common/error/ClientError";
import { useNotificationError } from "../../../common/hooks/useNotificationError";
import type { AllActivityResponse } from "@repo/types";

export const useActivities = () => {
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState<AllActivityResponse | null>(
    null,
  );
  const { handleError } = useNotificationError();

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        const activities = await getAllUserActivity();
        setActivities(activities);
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
    activities,
    loading,
  };
};
