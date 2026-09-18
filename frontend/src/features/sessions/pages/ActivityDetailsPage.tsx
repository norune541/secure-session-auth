import { LeftOutlined } from "@ant-design/icons";
import { Button, Layout, Skeleton } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { useActivity } from "../hooks/useActivity";
import { ActivityDetails } from "../components/ActivityDetails";

const { Content } = Layout;

export function ActivityDetailsPage() {
  const navigate = useNavigate();
  const { activityId } = useParams();

  const { loading, activity } = useActivity(activityId!);

  if (loading) {
    return <Skeleton />;
  }

  if (!activity) {
    return null;
  }

  return (
    <Content>
      <Button
        style={{ margin: 15 }}
        icon={<LeftOutlined />}
        onClick={() => navigate("/sessions/activity")}
      />

      <ActivityDetails activity={activity} />
    </Content>
  );
}
