import {
  Typography,
  Button,
  Layout,
  Flex,
  ConfigProvider,
  Form,
  Input,
} from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useChangePassword } from "../hooks/useChangePassword";

const { Title } = Typography;
const { Content } = Layout;

export function SecurityProfile() {
  const { loading, handleSubmit, contextHolder } = useChangePassword(() => {});

  const [form] = Form.useForm();

  return (
    <Content
      style={{
        marginLeft: 28,
        marginRight: 28,
        marginTop: 24,
      }}
    >
      {contextHolder}

      <Flex gap={32} align="flex-start" wrap="wrap">
        <Flex
          vertical
          style={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <Title
            level={4}
            style={{
              color: "black",
              marginTop: 0,
              fontWeight: "lighter",
            }}
          >
            Change password
          </Title>

          <Form
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
            requiredMark={false}
            style={{
              border: "1px solid #F0F0F0",
              borderRadius: 8,
              padding: 20,
            }}
          >
            <Form.Item
              label="Current password"
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter your current password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Enter your current password"
                autoComplete="current-password"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="New password"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter your new password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Enter your new password"
                autoComplete="new-password"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Confirm password"
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm password"
                autoComplete="new-password"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Button htmlType="submit" type="primary" loading={loading}>
              Change password
            </Button>
          </Form>
        </Flex>

        <Flex
          vertical
          style={{
            minWidth: 150,
          }}
        >
          <Title
            level={4}
            style={{
              color: "black",
              marginTop: 0,
              fontWeight: "lighter",
            }}
          >
            Logout
          </Title>

          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorText: "red",
                  colorBorder: "red",
                  defaultHoverBorderColor: "#ff4d4f",
                  defaultHoverBg: "#fff1f0",
                  defaultHoverColor: "#ff4d4f",
                  defaultActiveColor: "#cf1322",
                  defaultActiveBorderColor: "#cf1322",
                  defaultActiveBg: "#fff1f0",
                },
              },
            }}
          >
            <Button>Logout</Button>
          </ConfigProvider>
        </Flex>
      </Flex>
    </Content>
  );
}
