import { useNavigate } from "react-router-dom";
import { Listy, Typography, Flex, Button, Layout, Divider } from "antd";

import { DeviceIcon } from "./DeviceIcon";
import { formatActivityType } from "./formatActivityType";

import type { AllActivityResponse } from "@repo/types";

const { Content } = Layout;
const { Title, Text } = Typography;

export function ActivityList({ content }: { content: AllActivityResponse }) {
  const navigate = useNavigate();

  const formatter = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const items = content
    .filter((a) => a.type !== "REFRESHED")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .map((a) => ({
      key: a.id,
      activityId: a.id,
      sessionId: a.sessionId,
      device: a.session.device,
      createdAt: formatter.format(new Date(a.createdAt)),
      type: a.type,
    }));

  const renderItem = (item: (typeof items)[number]) => (
    <Button
      type="link"
      block
      onClick={() => navigate(`/sessions/activity/${item.activityId}`)}
      style={{
        padding: 10,
        paddingLeft: 0,
        height: "auto",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        textAlign: "left",
        color: "black",
      }}
    >
      <DeviceIcon device={item.device} size={30} />

      <Flex vertical style={{ marginLeft: 5, alignItems: "flex-start" }}>
        <Text>{formatActivityType(item.type)}</Text>
        <Flex vertical>
          <Text type="secondary">{item.device}</Text>
          <Text type="secondary">{item.createdAt}</Text>
        </Flex>
      </Flex>
    </Button>
  );

  return (
    <Content style={{ marginLeft: 20 }}>
      <Title level={2} style={{ margin: 0 }}>
        Activities
      </Title>

      <Text type="secondary">
        View the history of sessions and actions associated with your account.
      </Text>

      <Divider />

      <Listy height={600} rowKey="key" itemRender={renderItem} items={items} />
    </Content>
  );
}
