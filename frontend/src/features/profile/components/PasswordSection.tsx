import { useState, useMemo } from "react";
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  Modal,
  Skeleton,
  Switch,
  Tag,
  Typography,
} from "antd";
import { useChangePassword } from "../hooks/useChangePassword";
import { useActivities } from "../../sessions/hooks/useActivities";

const { Text } = Typography;

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

function KeyIcon({
  size = 20,
  color = "#EA580C",
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
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="M11.4 11.6 22 1" />
      <path d="M16 7h4" />
      <path d="M18 5h4" />
    </svg>
  );
}

export function PasswordSection() {
  const [form] = Form.useForm<PasswordFormValues>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoExpire, setAutoExpire] = useState(false);

  const [now] = useState(() => Date.now());

  const { activities, loading: activitiesLoading } = useActivities();
  const {
    loading: passwordLoading,
    handleSubmit,
    contextHolder,
  } = useChangePassword(() => {
    form.resetFields();
    setIsModalOpen(false);
  });

  const lastChangedText = useMemo(() => {
    if (!activities) return null;

    const passwordEvents = activities.filter(
      (item) => item.type === "PASSWORD_UPDATED",
    );

    if (passwordEvents.length === 0) return null;

    const latest = passwordEvents.reduce((prev, current) =>
      new Date(current.createdAt) > new Date(prev.createdAt) ? current : prev,
    );

    const diffTime = now - new Date(latest.createdAt).getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const relativeTime = rtf.format(-diffDays, "day");

    return `Last changed ${relativeTime}`;
  }, [activities, now]);

  return (
    <>
      {contextHolder}
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
                backgroundColor: "#FFF7ED",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <KeyIcon size={20} color="#EA580C" />
            </div>
            <Flex vertical gap={2}>
              <Text style={{ fontSize: 16, fontWeight: 600, color: "#111827" }}>
                Password
              </Text>
              {activitiesLoading ? (
                <Skeleton.Input
                  active
                  size="small"
                  style={{ width: 130, height: 16, marginTop: 2 }}
                />
              ) : (
                lastChangedText && (
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    {lastChangedText}
                  </Text>
                )
              )}
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
                Password strength
              </Text>
              <Text type="secondary" style={{ fontSize: 13 }}>
                Strong — meets all requirements
              </Text>
            </Flex>
            <Tag
              bordered={false}
              style={{
                backgroundColor: "#DCFCE7",
                color: "#166534",
                borderRadius: 20,
                padding: "2px 12px",
                fontWeight: 500,
                fontSize: 12,
                margin: 0,
              }}
            >
              Strong
            </Tag>
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
                Auto-expire password
              </Text>
              <Text type="secondary" style={{ fontSize: 13 }}>
                Force reset every 90 days
              </Text>
            </Flex>
            <Switch
              checked={autoExpire}
              onChange={(checked) => setAutoExpire(checked)}
            />
          </Flex>

          <Flex justify="flex-end" style={{ paddingTop: 8 }}>
            <Button
              style={{
                borderRadius: 8,
                fontWeight: 500,
                borderColor: "#E5E7EB",
                boxShadow: "none",
              }}
              onClick={() => setIsModalOpen(true)}
            >
              Change password
            </Button>
          </Flex>
        </Flex>
      </Card>

      <Modal
        title="Change Password"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        destroyOnHidden
      >
        <Form<PasswordFormValues>
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={handleSubmit}
          style={{ marginTop: 16 }}
        >
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[
              {
                required: true,
                message: "Please enter your current password.",
              },
            ]}
          >
            <Input.Password placeholder="Current password" />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please enter a new password.",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long.",
              },
            ]}
          >
            <Input.Password placeholder="New password" />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "Please confirm your new password.",
              },
              ({ getFieldValue }) => ({
                validator(_, value: string | undefined) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match."));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>

          <Flex justify="flex-end" gap={8} style={{ marginTop: 24 }}>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={passwordLoading}>
              Update Password
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  );
}
