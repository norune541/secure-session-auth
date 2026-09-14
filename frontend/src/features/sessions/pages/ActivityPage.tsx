import { Skeleton } from "antd";
import { useActivities } from "../hooks/useActivities";
import { ActivityList } from "../components/ActivityList";

export function ActivityPage() {
  const { activities, loading } = useActivities();

  if (loading) {
    return <Skeleton />;
  }

  if (activities) {
    return <ActivityList content={activities} />;
  }
}
