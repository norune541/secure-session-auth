import { Layout, Typography, Flex, Button } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { DeviceIcon } from "../components/DeviceIcon";
import type { AllSessionsResponse } from "@repo/types";

const { Content } = Layout;
const { Title, Text } = Typography;
type Session = AllSessionsResponse["sessions"][number];

export function RevokeSession() {
  const { state } = useLocation();
  const item = state?.item as Session;

  if (!item) {
    return <div>No item</div>;
  }

  return (
    <Content>
      <Flex
        vertical
        justify="center"
        align="center"
        style={{ textAlign: "left", margin: 20 }}
      >
        <DeviceIcon device={item.device} size={50} />
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
          <Button style={{ color: "red" }}>Log out</Button>
          <Text>
            If you don't recognize this device or didn't sign in from it, log
            out to end this session and keep your account secure.
          </Text>
        </Flex>
      </Flex>
    </Content>
  );
}
