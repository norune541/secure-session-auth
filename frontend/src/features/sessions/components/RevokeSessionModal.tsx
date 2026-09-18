import { Typography, Flex, Button, Tag, ConfigProvider } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

import { DeviceIcon } from "./DeviceIcon";
import { useRevokeSession } from "../hooks/useRevokeSession";

import type { Session } from "@repo/types";

const { Title, Text } = Typography;

export function RevokeSessionModal({
  session,
  isCurrentSession,
}: {
  session: Session;
  isCurrentSession: boolean;
}) {
  const { handleRevoke } = useRevokeSession();

  const formatter = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <Flex
      vertical
      justify="center"
      align="center"
      style={{ textAlign: "left", margin: 20 }}
    >
      <DeviceIcon device={session.device} size={75} />

      <Title level={3}>
        <Flex vertical style={{ textAlign: "center" }}>
          {session.device}

          <Text type="secondary" style={{ marginBottom: 20 }}>
            Device name
          </Text>
        </Flex>
      </Title>

      <Flex vertical gap={10}>
        <Text>
          <ClockCircleOutlined style={{ marginRight: 10 }} />
          Signed in {formatter.format(new Date(session.createdAt))}
        </Text>

        <Text style={{ marginBottom: 30 }}>
          <ClockCircleOutlined style={{ marginRight: 10 }} />
          Last active {formatter.format(new Date(session.updatedAt))}
        </Text>

        {!isCurrentSession ? (
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorText: "red",
                  colorBorder: "red",
                  defaultHoverBorderColor: "#ff4d4f",
                  defaultHoverBg: "#fff1f0",
                  defaultActiveColor: "#cf1322",
                  defaultActiveBorderColor: "#cf1322",
                  defaultActiveBg: "#fff1f0",
                },
              },
            }}
          >
            <Button
              style={{ color: "red" }}
              onClick={() => handleRevoke(session.id)}
            >
              Log out
            </Button>

            <Text>
              If you don't recognize this device or didn't sign in from it, log
              out to end this session and keep your account secure.
            </Text>
          </ConfigProvider>
        ) : (
          <Tag
            color="cyan"
            style={{
              textAlign: "center",
              padding: "4px 12px",
              borderRadius: 16,
              color: "#15e495",
            }}
          >
            Current session
          </Tag>
        )}
      </Flex>
    </Flex>
  );
}
