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
    device: s.device,
    updated: formatter.format(new Date(s.updatedAt)),
  }));
  const renderItem = (item) => (
    <Button
      type="link"
      block
      onClick={() => navigate("/sessions/revoke")}
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
      <DeviceIcon device={item.device} />

      <Flex vertical style={{ marginLeft: 5 }}>
        <span>{item.device}</span>
        <span>Last active {item.updated}</span>
      </Flex>
    </Button>
  );

  return (
    <Content style={{ marginLeft: 20 }}>
      <Title level={3} style={{ marginBottom: 0 }}>
        Sessions
      </Title>
      <Text>Tap a device to log out</Text>
      <Divider style={{ marginTop: 10 }} />

      <Listy rowKey="key" itemRender={renderItem} items={items}></Listy>
    </Content>
  );
}
