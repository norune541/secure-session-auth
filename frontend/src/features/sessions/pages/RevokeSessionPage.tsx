import {
  Layout,
  Typography,
  Flex,
  Button,
  Skeleton,
  Tag,
  ConfigProvider,
} from "antd";
import { ClockCircleOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { DeviceIcon } from "../components/DeviceIcon";
import { useRevokeSession } from "../hooks/useRevokeSession";
import { useSession } from "../hooks/useSession";

const { Content } = Layout;
const { Title, Text } = Typography;

export function RevokeSessionPage() {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const { session, loading } = useSession(sessionId!);
  const { handleRevoke } = useRevokeSession();

  if (!session) {
    return null;
  }

  const formatter = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return loading ? (
    <Skeleton />
  ) : (
    <Content>
      <Button
        style={{ margin: 15 }}
        icon={<LeftOutlined />}
        onClick={() => navigate("/sessions")}
      ></Button>
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
          {!session.currentSessionId ? (
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
                onClick={() => handleRevoke(sessionId!)}
              >
                Log out
              </Button>
              <Text>
                If you don't recognize this device or didn't sign in from it,
                log out to end this session and keep your account secure.
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
    </Content>
  );
}
