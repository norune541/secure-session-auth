import { Skeleton } from "antd";
import { useSessions } from "../hooks/useSessions";
import { SessionsList } from "../components/SessionsList";

export function SessionsPage() {
  const { sessions, loading } = useSessions();

  if (loading) {
    return <Skeleton />;
  }

  if (!sessions) {
    return null;
  }

  return <SessionsList content={sessions} />;
}
