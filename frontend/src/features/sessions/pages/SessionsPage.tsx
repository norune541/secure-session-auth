import { Skeleton } from "antd";
import { SessionsTable } from "../components/SessionsTable";
import { useSessions } from "../hooks/useSessions";

export function SessionsPage() {
  const { sessions, loading } = useSessions();
  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : (
        sessions && <SessionsTable content={sessions} />
      )}
    </div>
  );
}
