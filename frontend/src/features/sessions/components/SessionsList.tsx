import { useNavigate } from "react-router-dom";
import { Listy, Typography, Flex, Button, Layout, Tag } from "antd";
import { DeviceIcon } from "./DeviceIcon";
import type { AllSessionsResponse } from "@repo/types";

const { Content, Header } = Layout;
const { Title, Text } = Typography;

export function SessionsList({ content }: { content: AllSessionsResponse }) {
  const navigate = useNavigate();

  const formatter = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const items = [...content.sessions]
    .sort(
      (a, b) =>
        Number(b.id === content.currentSession) -
        Number(a.id === content.currentSession),
    )
    .map((s, _) => ({
      key: s.id,
      userId: s.userId,
      sessionId: s.id,
      createdAt: formatter.format(new Date(s.createdAt)),
      expiresAt: formatter.format(new Date(s.expiresAt)),
      device: s.device,
      updatedAt: formatter.format(new Date(s.updatedAt)),
      currentSession: s.id === content.currentSession,
    }));

  const renderItem = (item) => (
    <Button
      type="link"
      block
      onClick={() => navigate(`/sessions/${item.sessionId}`)}
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
        {item.currentSession && (
          <Tag
            style={{
              background: "transparent",
              color: "#15e495",
              fontWeight: "bolder",
              padding: 0,
            }}
          >
            • Current session
          </Tag>
        )}

        <Text>{item.device}</Text>
        <Text type="secondary">Last active {item.updatedAt}</Text>
      </Flex>
    </Button>
  );

  return (
    <>
      <Header style={{ padding: 0, marginLeft: 20 }}>
        <Flex vertical gap={0}>
          <Title level={2} style={{ margin: 0, lineHeight: 1.2 }}>
            Security & access
          </Title>

          <Text type="secondary">Tap a device to log out</Text>
        </Flex>
      </Header>

      <Content style={{ marginLeft: 20 }}>
        <Listy
          height={600}
          rowKey="key"
          itemRender={renderItem}
          items={items}
        ></Listy>
      </Content>
    </>
  );
}
