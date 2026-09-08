import { Layout, Typography, Flex, Button, Skeleton } from "antd";
import { ClockCircleOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { DeviceIcon } from "../components/DeviceIcon";
import { useRevokeSession } from "../hooks/useRevokeSession";
import { useSession } from "../hooks/useSession";

const { Content } = Layout;
const { Title, Text } = Typography;

export function RevokeSessionPage() {
  const navigate = useNavigate();
  const { userId, sessionId } = useParams();
  if (!userId || !sessionId) {
    navigate("/sessions");
    return;
  }
  const { session, loading } = useSession(userId, sessionId);
  const { handleRevoke } = useRevokeSession();

  const formatter = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  if (!session) {
    return <Text>No sessions found</Text>;
  }

  return loading ? (
    <Skeleton />
  ) : (
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
        <DeviceIcon device={session.device} size={75} />
        <Title level={3} style={{ color: "black" }}>
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
          <Text>
            <ClockCircleOutlined style={{ marginRight: 10 }} />
            Last active {formatter.format(new Date(session.updatedAt))}
          </Text>

          {!session.currentSessionId && (
            <Button
              style={{ color: "red", marginTop: 20 }}
              onClick={() => handleRevoke(userId!, sessionId!)}
            >
              Log out
            </Button>
          )}
          <Text>
            If you don't recognize this device or didn't sign in from it, log
            out to end this session and keep your account secure.
          </Text>
        </Flex>
      </Flex>
    </Content>
  );
}
