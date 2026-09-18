import { Descriptions, Typography, Flex, Divider } from "antd";

import { DeviceIcon } from "./DeviceIcon";
import { formatActivityType } from "./formatActivityType";

import type { ActivityResponse } from "@repo/types";

const { Title, Text } = Typography;

export function ActivityDetails({ activity }: { activity: ActivityResponse }) {
  const formatter = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <>
      <Flex vertical align="center" gap={8} style={{ margin: "10px 0 20px" }}>
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
    </>
  );
}
