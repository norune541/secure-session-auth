import {
  Layout,
  Flex,
  Typography,
  Divider,
  Avatar,
  Grid,
  Menu,
  Form,
  Input,
  Button,
  Upload,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { SecurityProfile } from "./SecurityProfile";
import { useProfileNavigation } from "../hooks/useProfile";
import type { MenuProps } from "antd";
import type { User } from "@repo/types";

const { Header, Content } = Layout;
const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

type MenuItem = Required<MenuProps>["items"][number];

export function ProfileComponent({ content }: { content: User }) {
  const screens = useBreakpoint();
  const isDesktop = screens.md;

  const { current, onClick, form, loading, handleSubmit } =
    useProfileNavigation();
  const menuItems: MenuItem[] = [
    {
      label: "Profile",
      key: "profile",
    },
    {
      label: "Security",
      key: "security",
    },
  ];

  return (
    <Layout>
      <Header
        style={{
          height: "fit-content",
          padding: "0 28px",
        }}
      >
        <Menu
          mode="horizontal"
          onClick={onClick}
          items={menuItems}
          defaultSelectedKeys={["profile"]}
          style={{
            marginBottom: 20,
          }}
        />

        <Flex gap="large" align="center">
          {/* TODO: add profile picture */}
          <Avatar size={72} icon={<UserOutlined />} />

          <Flex vertical gap="small">
            <Text>
              {content.firstName} {content.lastName}
            </Text>
            <Text>{content.role}</Text>
          </Flex>
        </Flex>
      </Header>

      {current === "profile" && (
        <Content
          style={{
            marginTop: 20,
            padding: "0 28px",
            maxWidth: 1000,
          }}
        >
          <Title level={3}>Personal Information</Title>

          <Divider />

          <Form
            requiredMark={false}
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              firstName: content.firstName,
              lastName: content.lastName,
              phone: content.phone,
              email: content.email,
            }}
          >
            <Flex vertical gap={20}>
              <Flex gap={20} wrap={!isDesktop ? "wrap" : "nowrap"}>
                <Form.Item
                  name="firstName"
                  label="First name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your first name",
                    },
                  ]}
                  style={{
                    flex: 1,
                    minWidth: isDesktop ? 0 : "100%",
                    margin: 0,
                  }}
                >
                  <Input placeholder="First name" prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  label="Last name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your last name",
                    },
                  ]}
                  style={{
                    flex: 1,
                    minWidth: isDesktop ? 0 : "100%",
                    margin: 0,
                  }}
                >
                  <Input placeholder="Last name" prefix={<UserOutlined />} />
                </Form.Item>
              </Flex>

              <Flex gap={20} wrap={!isDesktop ? "wrap" : "nowrap"}>
                <Form.Item
                  label="Email"
                  name="email"
                  style={{
                    flex: 1,
                    minWidth: isDesktop ? 0 : "100%",
                    margin: 0,
                  }}
                  rules={[
                    { required: true, message: "Please write your email!" },
                    { type: "email", message: "Please write correct email!" },
                  ]}
                >
                  <Input placeholder="Email" prefix={<MailOutlined />} />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone"
                  style={{
                    flex: 1,
                    minWidth: isDesktop ? 0 : "100%",
                    margin: 0,
                  }}
                  rules={[
                    { required: true, message: "Please write your phone!" },
                  ]}
                >
                  <Input placeholder="Phone" prefix={<PhoneOutlined />} />
                </Form.Item>
              </Flex>
              <Form.Item
                label="Profile picture"
                style={{ margin: 0, marginTop: 12 }}
              >
                <Flex gap={20} align="center">
                  <Upload>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>

                  <Avatar icon={<UserOutlined />} />
                </Flex>
              </Form.Item>
              <Divider />

              <Flex justify="start">
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={loading}
                  style={{ marginBottom: 15 }}
                >
                  Save changes
                </Button>
              </Flex>
            </Flex>
          </Form>
        </Content>
      )}
      {current === "security" && <SecurityProfile />}
    </Layout>
  );
}
