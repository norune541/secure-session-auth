import { Skeleton } from "antd";
import { SessionsList } from "../components/SessionsList";
import { useSessions } from "../hooks/useSessions";

export function SessionsPage() {
  const { sessions, loading } = useSessions();

  if (loading) {
    return <Skeleton />;
  }

  if (sessions) {
    return <SessionsList content={sessions} />;
  }
}
