import { useNavigate } from "react-router-dom";
import { Listy, Typography, Flex, Button, Layout, Divider } from "antd";
import { DeviceIcon } from "./DeviceIcon";
import type { AllSessionsResponse } from "@repo/types";

const { Content } = Layout;
const { Title, Text } = Typography;

export function SessionsList({ content }: { content: AllSessionsResponse }) {
  const navigate = useNavigate();

  const formatter = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const items = content.sessions.map((s, index) => ({
    key: index,
    userId: s.userId,
    revoked: s.revoked,
    createdAt: formatter.format(new Date(s.createdAt)),
    expiresAt: formatter.format(new Date(s.expiresAt)),
    device: s.device,
    updatedAt: formatter.format(new Date(s.updatedAt)),
  }));
  const renderItem = (item) => (
    <Button
      type="link"
      block
      onClick={() => navigate("/sessions/revoke", { state: { item } })}
      style={{
        padding: 20,
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

      <Flex vertical style={{ marginLeft: 5 }}>
        <Text>{item.device}</Text>
        <Text>Last active {item.updatedAt}</Text>
      </Flex>
    </Button>
  );

  return (
    <Content>
      <Title level={3} style={{ marginBottom: 0, marginTop: 0 }}>
        Sessions
      </Title>
      <Text>Tap a device to log out</Text>
      <Divider></Divider>

      <Listy rowKey="key" itemRender={renderItem} items={items}></Listy>
    </Content>
  );
}
