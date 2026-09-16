import {
  Flex,
  Typography,
  Input,
  Divider,
  Form,
  Button,
  Grid,
  Layout,
} from "antd";
import { LockOutlined, MailOutlined, AppleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { GoogleIcon } from "../../../common/assets/icons/GoogleIcon";
import { FacebookIcon } from "../../../common/assets/icons/FacebookIcon";
import { ActivitiesMockup } from "./ActivitiesMockup";

const { Header } = Layout;
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
        <Header
          style={{
            width: "100%",
            maxWidth: 500,
            textAlign: "left",
            marginBottom: 30,
          }}
        >
          <Flex align="flex-start" gap={8}>
            <svg
              fill="none"
              height="48"
              viewBox="0 0 37 48"
              width="30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="m12.8841 4.30945-6.8842 3.97574 6.8891 3.97661 6.8862-3.97575zm8.8919 7.44025-6.887 3.9762-.0007 7.9532 6.8877-3.9771zm2 11.4164-6.8879 3.9772 6.8889 3.9765 6.8871-3.9763zm8.8879 7.4416-6.8868 3.9761v7.9522l6.8868-3.9761zm-10.8868 11.9287v-7.9525l-6.8891-3.9766v7.9525zm-10.8888-18.8569-6.8883-3.9775v-7.9526l6.889 3.9765zm-.0003 4.6187-9.38814-5.4209c-.928127-.5359-1.49986-1.5262-1.49986-2.598v-11.99368c0-.71444.381106-1.37463.999789-1.73193l10.383811-5.996798c.9281-.5359626 2.0716-.5361538 2.9998-.000505l10.3922 5.996973c.6193.3572 1.0004 1.0176 1.0004 1.73226v11.41638l9.888 5.7096c.6188.3573.9999 1.0176.9999 1.732v11.9937c0 1.0718-.5711 2.0621-1.5 2.598l-10.3868 5.9969c-.6187.3572-1.381.0001-1.9998.0001l-10.3891-5.9969c-.9283-.5359-1.5002-1.5263-1.5002-2.5982z"
                fill="#ea580c"
                fillRule="evenodd"
              />
            </svg>

            <Title level={3} style={{ marginTop: 8 }}>
              Clearpoint
            </Title>
          </Flex>
          <Title
            level={isDesktop ? 1 : 2}
            style={{ marginTop: 25, marginBottom: 4, color: "black" }}
          >
            Join us today
          </Title>
          <Text style={{ marginBottom: 30 }}>
            Sign up to get started and access all features.
          </Text>
        </Header>
        <Form
          layout="vertical"
          style={{ maxWidth: 500, width: "100%" }}
          onFinish={step}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please write your email!" },
              { type: "email", message: "Please write correct email!" },
            ]}
          >
            <Input placeholder="example@email.com" prefix={<MailOutlined />} />
          </Form.Item>

          <Form.Item
            name="password"
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
              style={{ padding: "18px", borderRadius: 7 }}
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
            background: "#0B132B",
            borderRadius: 16,
          }}
        >
          <Flex
            vertical
            justify="center"
            align="left"
            style={{ textAlign: "left", padding: "20px 50px" }}
          >
            <Title level={2} style={{ color: "#ffff", fontWeight: "lighter" }}>
              Your security starts here
            </Title>
            <Text style={{ color: "#ffff" }}>
              Create your account and get full visibility into authentication
              activity.
            </Text>
            <ActivitiesMockup />
          </Flex>
        </div>
      )}
    </Flex>
  );
}
