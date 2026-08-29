import {
  Typography,
  Flex,
  Form,
  Input,
  Button,
  Checkbox,
  Divider,
  Grid,
} from "antd";
import { AppleFilled } from "@ant-design/icons";
import { GoogleIcon } from "../../../common/assets/icons/GoogleIcon";
import { FacebookIcon } from "../../../common/assets/icons/FacebookIcon";

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

export function SignupProfile({ step }) {
  const screens = useBreakpoint();
  const isDesktop = screens.md;

  return (
    <Flex gap={20}>
      <Flex
        flex={1}
        vertical
        align="center"
        justify="center"
        style={{ height: "100dvh", padding: "0 20px" }}
      >
        <Title level={2}>Almost there!</Title>
        <Text
          type="secondary"
          style={{ marginBottom: 30, textAlign: "center" }}
        >
          Just a few more details and your account will be ready.
        </Text>
        <Form layout="vertical" style={{ width: "100%", maxWidth: "500px" }}>
          <Form.Item
            name="firstName"
            label="First name"
            rules={[
              { required: true, message: "Please write your first name!" },
            ]}
            style={{ flex: 1 }}
          >
            <Input placeholder="John" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last name"
            rules={[
              { required: true, message: "Please write your first name!" },
            ]}
            style={{ flex: 1 }}
          >
            <Input placeholder="Doe" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Please write your phone!" }]}
          >
            <Input placeholder="+1 202 555 0123" />
          </Form.Item>
          <Flex justify="space-between">
            <Form.Item
              name="rememberMe"
              valuePropName="checked"
              style={{ margin: 0 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item style={{ margin: 0 }}>
              <Button onClick={step} type="link" style={{ padding: 0 }}>
                Back to the previous step
              </Button>
            </Form.Item>
          </Flex>
          <Form.Item style={{ marginTop: "10px", marginBottom: "16px" }}>
            <Button
              block
              type="primary"
              htmlType="submit"
              style={{ padding: "18px", borderRadius: 18 }}
            >
              Create an account
            </Button>
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
