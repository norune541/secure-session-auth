import { Skeleton, Grid } from "antd";
import { SessionsTable } from "../components/SessionsTable";
import { SessionsList } from "../components/SessionsList";
import { useSessions } from "../hooks/useSessions";

export function SessionsPage() {
  const { sessions, loading } = useSessions();
  const screens = Grid.useBreakpoint();
  const isDesktop = screens.md;
  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : sessions && isDesktop ? (
        <SessionsTable content={sessions} />
      ) : (
        sessions && <SessionsList content={sessions} />
      )}
    </div>
  );
}
