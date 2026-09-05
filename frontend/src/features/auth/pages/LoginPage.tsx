import {
  Flex,
  Typography,
  Input,
  Divider,
  Form,
  Button,
  Checkbox,
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
  const { loading, handleSubmit } = useLogin();

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
        <Title level={2} style={{ marginBottom: "4px" }}>
          Welcome Back
        </Title>

        <Text
          type="secondary"
          style={{
            display: "block",
            marginBottom: "32px",
            textAlign: "center",
          }}
        >
          Enter your credentials to continue to your dashboard
        </Text>

        <Form
          layout="vertical"
          style={{
            width: "100%",
            maxWidth: "500px",
            textAlign: "left",
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="login"
            label="Email or Phone"
            rules={[
              {
                required: true,
                message: "Please write email or phone!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="example@email.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
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
              placeholder="Enter your password"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Flex justify="space-between" align="center">
            <Form.Item
              name="remember"
              valuePropName="checked"
              style={{ margin: 0 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link to="/">Forgot password?</Link>
          </Flex>

          <Form.Item
            style={{
              marginTop: "10px",
              marginBottom: "16px",
            }}
          >
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                padding: "18px",
                borderRadius: 18,
              }}
            >
              Sign in
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: "left" }}>
            <Link to="/signup">Do not have an account?</Link>
          </Form.Item>

          <Divider style={{ margin: "24px 0" }}>Or continue with</Divider>

          <Flex justify="space-between" gap="middle" style={{ width: "100%" }}>
            <Button
              style={{
                flex: 1,
                borderRadius: 12,
              }}
              icon={<AppleFilled style={{ color: "#000" }} />}
            >
              {isDesktop && <span>Apple</span>}
            </Button>

            <Button
              style={{
                flex: 1,
                borderRadius: 12,
              }}
              icon={<GoogleIcon />}
            >
              {isDesktop && <span>Google</span>}
            </Button>

            <Button
              style={{
                flex: 1,
                borderRadius: 12,
              }}
              icon={<FacebookIcon />}
            >
              {isDesktop && <span>Facebook</span>}
            </Button>
          </Flex>
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
