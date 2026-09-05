import { Skeleton } from "antd";
import { SessionsComponent } from "../components/SessionsComponent";
import { useSessions } from "../hooks/useSessions";

export function SessionsPage() {
  const { sessions, loading } = useSessions();
  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : (
        sessions && <SessionsComponent content={sessions} />
      )}
    </div>
  );
}
