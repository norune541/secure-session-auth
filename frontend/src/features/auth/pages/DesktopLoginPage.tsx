import { Flex, Typography, Input, Divider, Checkbox, Form, Button } from "antd";
import { UserOutlined, LockOutlined, AppleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { GoogleIcon } from "../../../common/assets/icons/GoogleIcon";
import { FacebookIcon } from "../../../common/assets/icons/FacebookIcon";
import { useLogin } from "../hooks/useLogin";

const { Title, Text } = Typography;

export function DesktopLoginPage() {
  const { loading, contextHolder, handleSubmit } = useLogin();

  return (
    <Flex align="center" justify="center" style={{ height: "100vh" }}>
      {contextHolder}

      <Flex
        vertical
        justify="center"
        align="flex-start"
        style={{ flex: 1, height: "100%", padding: "0 10%" }}
      >
        <div style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
          <Title level={2} style={{ marginBottom: "4px" }}>
            Welcome Back
          </Title>
          <Text
            type="secondary"
            style={{ display: "block", marginBottom: "32px" }}
          >
            Enter your credentials to continue to your dashboard
          </Text>

          <Form
            layout="vertical"
            style={{ width: "100%" }}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please write correct email!" },
              ]}
            >
              <Input
                style={{ padding: "8px" }}
                prefix={<UserOutlined />}
                placeholder="example@email.com"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 8, message: "Password must be at least 8 characters!" },
              ]}
            >
              <Input.Password
                style={{ padding: "8px" }}
                placeholder="Enter your password"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to={"/"}>Forgot password?</Link>
            </Flex>

            <Form.Item style={{ marginTop: "24px", marginBottom: "16px" }}>
              <Button
                block
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ padding: "18px" }}
              >
                Sign in
              </Button>
            </Form.Item>

            <Divider style={{ margin: "24px 0" }}>Or continue with</Divider>

            <Flex
              justify="space-between"
              gap="middle"
              style={{ width: "100%" }}
            >
              <Button
                style={{ flex: 1 }}
                icon={<AppleFilled style={{ color: "#000" }} />}
              >
                Apple
              </Button>
              <Button style={{ flex: 1 }} icon={<GoogleIcon />}>
                Google
              </Button>
              <Button style={{ flex: 1 }} icon={<FacebookIcon />}>
                Facebook
              </Button>
            </Flex>
          </Form>
        </div>
      </Flex>

      <div
        style={{
          flex: 1,
          height: "calc(100% - 24px)",
          margin: "12px",
          backgroundColor: "rgb(73, 41, 255)",
          borderRadius: 16,
          color: "white",
          overflow: "hidden",
        }}
      >
        <Flex
          vertical
          justify="start"
          align="flex-start"
          style={{ height: "100%", padding: "15% 10%" }}
        >
          <Title style={{ color: "inherit", marginBottom: "0px" }} level={2}>
            Are You Fully Prepared for Your Next Interactive Session?
          </Title>
          <Text
            type="secondary"
            style={{ color: "#f6f6f6", marginTop: "12px" }}
          >
            Keep track of all active user sessions, monitor device activity, and
            secure your account with a single click.
          </Text>
        </Flex>
      </div>
    </Flex>
  );
}
