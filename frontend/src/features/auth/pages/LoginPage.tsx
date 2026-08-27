import {
  Flex,
  Typography,
  Input,
  Divider,
  Checkbox,
  Form,
  Button,
  Grid,
} from "antd";
import { UserOutlined, LockOutlined, AppleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { GoogleIcon } from "../../../common/assets/icons/GoogleIcon";
import { FacebookIcon } from "../../../common/assets/icons/FacebookIcon";
import { useLogin } from "../hooks/useLogin";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export function LoginPage() {
  const { loading, contextHolder, handleSubmit } = useLogin();
  const screens = useBreakpoint();
  const isDesktop = screens.md;

  return (
    <Flex align="center" justify="center" style={{ height: "100dvh" }}>
      {contextHolder}

      <Flex
        vertical
        justify="center"
        align="flex-start"
        style={
          isDesktop
            ? { flex: 0.7, padding: "0px" }
            : { flex: 1, padding: "20px" }
        }
      >
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            margin: "0 auto",
            textAlign: isDesktop ? "left" : "center",
          }}
        >
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
              name="login"
              label="Email or Phone"
              rules={[
                { required: true, message: "Please write email or phone!  " },
              ]}
            >
              <Input
                style={{
                  padding: "8px",
                  backgroundColor: "#f8f8f8",
                  borderRadius: 18,
                }}
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
                style={{
                  padding: "8px",
                  backgroundColor: "#f8f8f8",
                  borderRadius: 18,
                }}
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

            <Form.Item style={{ marginTop: "10px", marginBottom: "16px" }}>
              <Button
                block
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ padding: "18px", borderRadius: 18 }}
              >
                Sign in
              </Button>
            </Form.Item>

            <Form.Item style={{ textAlign: "left" }}>
              <Link to={"/signup"}>Already have an account?</Link>
            </Form.Item>

            <Divider style={{ margin: "24px 0" }}>Or continue with</Divider>

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
                {isDesktop && <span>Faceebook</span>}
              </Button>
            </Flex>
          </Form>
        </div>
      </Flex>

      {isDesktop && (
        <div
          style={{
            flex: 0.5,
            height: "calc(100% - 24px)",
            margin: "12px",
            padding: "20px",
            paddingTop: "5%",
            backgroundColor: "rgb(73, 41, 255)",
            borderRadius: 16,
            color: "white",
            overflow: "hidden",
          }}
        >
          <Title style={{ color: "inherit" }} level={2}>
            Are You Fully Prepared for Your Next Interactive Session?
          </Title>

          <Text
            type="secondary"
            style={{ color: "#f6f6f6", marginTop: "12px" }}
          >
            Keep track of all active user sessions, monitor device activity, and
            secure your account with a single click.
          </Text>
        </div>
      )}
    </Flex>
  );
}
