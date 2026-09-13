import { useState, useEffect } from "react";
import { getUserActivity } from "../api/activityLogs";
import { ClientError } from "../../../common/error/ClientError";
import { useNotificationError } from "../../../common/hooks/useNotificationError";
import type { ActivityResponse } from "@repo/types";

export const useActivity = (activeId: string) => {
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState<ActivityResponse | null>(null);
  const { handleError } = useNotificationError();

  useEffect(() => {
    const fetchActivity = async () => {
      setLoading(true);
      try {
        const activity = await getUserActivity(activeId);
        setActivity(activity);
      } catch (err) {
        if (err instanceof ClientError) handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  return {
    activity,
    loading,
  };
};
