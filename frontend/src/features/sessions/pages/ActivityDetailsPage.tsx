import { LeftOutlined } from "@ant-design/icons";
import {
  Descriptions,
  Skeleton,
  Layout,
  Typography,
  Button,
  Flex,
  Divider,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";

import { useActivity } from "../hooks/useActivity";
import { DeviceIcon } from "../components/DeviceIcon";
import { formatActivityType } from "../components/formatActivityType";

const { Content } = Layout;
const { Title, Text } = Typography;

export function ActivityDetailsPage() {
  const navigate = useNavigate();
  const { activityId } = useParams();

  const { loading, activity } = useActivity(activityId!);

  const formatter = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  });

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

      <Flex vertical align="center" gap={8} style={{ margin: 20 }}>
        <DeviceIcon device={activity.session.device} size={75} />

        <Title level={3} style={{ margin: 0 }}>
          {activity.session.device}
        </Title>

        <Text type="secondary" style={{ fontWeight: "bolder" }}>
          {formatActivityType(activity.type)}
        </Text>
      </Flex>

      <Divider />
      <Descriptions
        style={{ margin: 30 }}
        column={1}
        styles={{
          label: {
            width: "30%",
          },
          content: {
            width: "70%",
          },
        }}
        items={[
          {
            key: "type",
            label: "Activity",
            children: formatActivityType(activity.type),
          },
          {
            key: "device",
            label: "Device",
            children: activity.session.device,
          },
          {
            key: "ip",
            label: "IP",
            children: activity.session.ip,
          },
          {
            key: "date",
            label: "Date",
            children: formatter.format(new Date(activity.createdAt)),
          },
          {
            key: "session",
            label: "Session",
            children: activity.sessionId,
          },
        ]}
      />
    </Content>
  );
}
