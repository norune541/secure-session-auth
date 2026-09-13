import { Skeleton, Grid } from "antd";
import { useActivities } from "../hooks/useActivities";
import { ActivityList } from "../components/ActivityList";

export function ActivityPage() {
  const { activities, loading } = useActivities();
  const screens = Grid.useBreakpoint();
  const isDesktop = screens.md;

  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : activities && isDesktop ? null : (
        activities && <ActivityList content={activities} />
      )}
    </div>
  );
}
