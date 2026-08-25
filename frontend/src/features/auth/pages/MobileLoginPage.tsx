import { LockOutlined, UserOutlined, AppleFilled } from "@ant-design/icons";
import { Button, Flex, Form, Input, Divider, Typography, Checkbox } from "antd";
import { Link } from "react-router-dom";

import { GoogleIcon } from "../../../common/assets/icons/GoogleIcon";
import { FacebookIcon } from "../../../common/assets/icons/FacebookIcon";
import { useLogin } from "../hooks/useLogin";

const { Title, Paragraph } = Typography;

export function MobileLoginPage() {
  const { loading, contextHolder, handleSubmit } = useLogin();

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        minHeight: "100dvh",
        padding: "20px 0",
      }}
    >
      {contextHolder}

      <Form
        layout="vertical"
        initialValues={{ remember: true }}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "0 14px",
          boxSizing: "border-box",
        }}
        onFinish={handleSubmit}
      >
        <Title level={1} style={{ marginBottom: 0 }}>
          Test app
        </Title>

        <Paragraph style={{ fontSize: "18px", marginBottom: "20px" }}>
          Sign in to your account
        </Paragraph>

        <Form.Item style={{ marginBottom: "4px" }}>
          <Link to="/register">Do not have an account?</Link>
        </Form.Item>

        <Form.Item
          name="email"
          style={{ marginBottom: "18px" }}
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Please write correct email!",
            },
          ]}
        >
          <Input
            style={{ padding: "8px" }}
            prefix={<UserOutlined />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          style={{ marginBottom: "26px" }}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 8,
              message: "Password must be at least 8 characters!",
            },
          ]}
        >
          <Input.Password
            style={{ padding: "8px" }}
            prefix={<LockOutlined />}
            placeholder="Password"
          />
        </Form.Item>

        <Flex justify="space-between" align="center">
          <Form.Item
            name="remember"
            valuePropName="checked"
            style={{ marginBottom: "8px" }}
          >
            <Checkbox style={{ fontSize: "12px" }}>Remember me</Checkbox>
          </Form.Item>

          <Form.Item style={{ marginBottom: "8px" }}>
            <Link to="/">Forgot password?</Link>
          </Form.Item>
        </Flex>

        <Form.Item style={{ marginBottom: "32px" }}>
          <Button block type="primary" htmlType="submit" loading={loading}>
            Sign in
          </Button>
        </Form.Item>

        <Divider>Or continue with</Divider>

        <Form.Item style={{ marginBottom: "12px" }}>
          <Flex
            justify="space-between"
            align="center"
            gap="middle"
            style={{ width: "100%" }}
          >
            <Button
              style={{ flex: 1 }}
              icon={<AppleFilled style={{ color: "#000" }} />}
            />

            <Button style={{ flex: 1 }} icon={<GoogleIcon />} />

            <Button style={{ flex: 1 }} icon={<FacebookIcon />} />
          </Flex>
        </Form.Item>
      </Form>
    </Flex>
  );
}
