import { useState, useEffect } from "react";
import { message, Skeleton } from "antd";

import { getAllUserSessions } from "../../api/sessions";
import { SessionsComponent } from "../../common/components/SessionsComponent";
import { ClientError } from "../../common/error/ClientError";
import type { AllSessionsResponse } from "@repo/types";

export function SessionsPage() {
  const [apiMessage, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<AllSessionsResponse | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        const sessions = await getAllUserSessions();
        setSessions(sessions);
      } catch (err) {
        if (err instanceof ClientError && err.type !== "API_ERROR")
          apiMessage.open({
            type: "error",
            content: err.message,
          });
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [apiMessage]);

  return (
    <div>
      {contextHolder}
      {loading ? (
        <Skeleton />
      ) : (
        sessions && <SessionsComponent content={sessions} />
      )}
    </div>
  );
}
