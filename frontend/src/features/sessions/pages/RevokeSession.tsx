import { Layout, Typography, Flex, Button } from "antd";
import { ClockCircleOutlined, LeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { DeviceIcon } from "../components/DeviceIcon";
import type { AllSessionsResponse } from "@repo/types";

const { Content } = Layout;
const { Title, Text } = Typography;
type Session = AllSessionsResponse["sessions"][number];

export function RevokeSession() {
  // TODO: Replace location state with a hook that fetches the session using the session ID from the URL params.

  const { state } = useLocation();
  const navigate = useNavigate();
  const item = state?.item as Session;

  if (!item) {
    return <Text>No sessions found</Text>;
  }

  return (
    <Content>
      <Button
        icon={<LeftOutlined />}
        onClick={() => navigate("/sessions")}
      ></Button>
      <Flex
        vertical
        justify="center"
        align="center"
        style={{ textAlign: "left", margin: 20 }}
      >
        <DeviceIcon device={item.device} size={75} />
        <Title level={3} style={{ color: "black" }}>
          <Flex vertical style={{ textAlign: "center" }}>
            {item.device}
            <Text type="secondary" style={{ marginBottom: 20 }}>
              Device name
            </Text>
          </Flex>
        </Title>
        <Flex vertical gap={10}>
          <Text>
            <ClockCircleOutlined style={{ marginRight: 10 }} />
            Signed in {item.createdAt as string}
          </Text>
          <Text>
            <ClockCircleOutlined style={{ marginRight: 10 }} />
            Last active {item.updatedAt as string}
          </Text>
          <Text>
            <ClockCircleOutlined
              style={{ marginRight: 10, marginBottom: 20 }}
            />
            Session ends {item.expiresAt as string}
          </Text>
          <Button style={{ color: "red", marginTop: 20 }}>Log out</Button>
          <Text>
            If you don't recognize this device or didn't sign in from it, log
            out to end this session and keep your account secure.
          </Text>
        </Flex>
      </Flex>
    </Content>
  );
}
