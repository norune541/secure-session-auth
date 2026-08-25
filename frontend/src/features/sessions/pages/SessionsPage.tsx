import { Skeleton } from "antd";
import { SessionsComponent } from "../components/SessionsComponent";
import { useSessions } from "../hooks/useSessions";

export function SessionsPage() {
  const { sessions, loading, contextHolder } = useSessions();
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
