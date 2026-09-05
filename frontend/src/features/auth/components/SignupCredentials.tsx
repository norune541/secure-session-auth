import { Flex, Typography, Input, Divider, Form, Button, Grid } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { AppleFilled } from "@ant-design/icons";
import { GoogleIcon } from "../../../common/assets/icons/GoogleIcon";
import { FacebookIcon } from "../../../common/assets/icons/FacebookIcon";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export function SignupCredentials({ step }) {
  const screens = useBreakpoint();
  const isDesktop = screens.md;

  return (
    <Flex gap={20}>
      <Flex
        flex={1}
        vertical
        justify="center"
        align="center"
        style={{
          height: "100dvh",
          padding: "0 20px",
        }}
      >
        <Title level={2} style={{ marginTop: 20, marginBottom: 10 }}>
          Join us today
        </Title>
        <Text type="secondary" style={{ marginBottom: 30 }}>
          Sign up to get started and access all features.
        </Text>
        <Form
          layout="vertical"
          style={{ maxWidth: 500, width: "100%" }}
          onFinish={step}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please write your email!" },
              { type: "email", message: "Please write correct email!" },
            ]}
          >
            <Input placeholder="example@email.com" prefix={<MailOutlined />} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please write your password!" },
              { min: 8, message: "Password must be at least 8 characters!" },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              prefix={<LockOutlined />}
              type="password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm password"
            dependencies={["password"]}

            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm password"
              prefix={<LockOutlined />}
              type="password"
            />
          </Form.Item>
          <Flex justify="space-between">
            <Form.Item style={{ margin: 0 }}>
              <Link to={"/login"}>Already have an account?</Link>
            </Form.Item>
          </Flex>
          <Form.Item style={{ marginTop: "10px", marginBottom: "16px" }}>
            <Button
              block
              type="primary"
              htmlType="submit"
              style={{ padding: "18px", borderRadius: 18 }}
            >
              Next step
            </Button>
            <Divider>Or continue with</Divider>
            <Flex
              justify="space-between"
              gap="middle"
              style={{ width: "100%" }}
            >
              <Button
                style={{ flex: 1, borderRadius: 12 }}
                icon={<AppleFilled style={{ color: "#000" }} />}
              >
                {isDesktop && <span>Apple</span>}
              </Button>

              <Button
                style={{ flex: 1, borderRadius: 12 }}
                icon={<GoogleIcon />}
              >
                {isDesktop && <span>Google</span>}
              </Button>

              <Button
                style={{ flex: 1, borderRadius: 12 }}
                icon={<FacebookIcon />}
              >
                {isDesktop && <span>Facebook</span>}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Flex>
      {isDesktop && (
        <div
          style={{
            flex: 1,
            margin: 12,
            background: "#0082aa",
            borderRadius: 16,
          }}
        />
      )}
    </Flex>
  );
}
