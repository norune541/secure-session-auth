import { Button, Card, Flex, Typography, message } from "antd";

const { Text } = Typography;

function WarningIcon({
  size = 20,
  color = "#DC2626",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export function DangerZoneSection() {
  const handleSignOutAll = () => {
    message.info("Sign out all devices action triggered.");
  };

  const handleDeleteAccount = () => {
    message.warning("Delete account action triggered.");
  };

  return (
    <Card
      variant="outlined"
      style={{
        borderRadius: 16,
        borderColor: "#F3F4F6",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Flex vertical gap={20}>
        <Flex align="center" gap={14}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: "#FEF2F2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WarningIcon size={20} color="#DC2626" />
          </div>
          <Flex vertical gap={2}>
            <Text style={{ fontSize: 16, fontWeight: 600, color: "#DC2626" }}>
              Danger zone
            </Text>
            <Text type="secondary" style={{ fontSize: 13 }}>
              These actions are permanent and cannot be undone. Proceed with
              caution
            </Text>
          </Flex>
        </Flex>

        <Flex
          align="center"
          justify="space-between"
          style={{
            paddingTop: 16,
            borderTop: "1px solid #F3F4F6",
          }}
        >
          <Flex vertical gap={2}>
            <Text style={{ fontWeight: 500, fontSize: 14, color: "#111827" }}>
              Sign out all devices
            </Text>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Immediately revokes all active sessions except the current one
            </Text>
          </Flex>
          <Button
            danger
            ghost
            style={{
              borderRadius: 8,
              fontWeight: 500,
            }}
            onClick={handleSignOutAll}
          >
            Sign out all
          </Button>
        </Flex>

        <Flex
          align="center"
          justify="space-between"
          style={{
            paddingTop: 16,
            borderTop: "1px solid #F3F4F6",
          }}
        >
          <Flex vertical gap={2}>
            <Text style={{ fontWeight: 500, fontSize: 14, color: "#111827" }}>
              Delete account
            </Text>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Permanently removes your account, projects, and all data
            </Text>
          </Flex>
          <Button
            danger
            ghost
            style={{
              borderRadius: 8,
              fontWeight: 500,
            }}
            onClick={handleDeleteAccount}
          >
            Delete account
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
