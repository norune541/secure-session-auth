import {
  Layout,
  Flex,
  Typography,
  Avatar,
  Grid,
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
import { useEffect } from "react";

import { useProfileNavigation } from "../hooks/useProfile";
import "./ProfileComponent.css";

import type { User } from "@repo/types";

const { Content } = Layout;
const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

interface ProfileComponentProps {
  content: User;
}

export function ProfileComponent({ content }: ProfileComponentProps) {
  const screens = useBreakpoint();
  const isDesktop = Boolean(screens.md);

  const { form, loading, handleSubmit } = useProfileNavigation();

  useEffect(() => {
    form.setFieldsValue({
      firstName: content.firstName,
      lastName: content.lastName,
      phone: content.phone,
      email: content.email,
    });
  }, [content, form]);

  return (
    <Content className="profile-content">
      <Flex align="center" gap={16} className="profile-content__user">
        <Avatar size={72} icon={<UserOutlined />} />

        <Flex vertical gap={4}>
          <Text strong>
            {content.firstName} {content.lastName}
          </Text>
          <Text type="secondary">{content.role}</Text>
        </Flex>
      </Flex>

      <Title level={3} className="profile-content__title">
        Personal Information
      </Title>

      <Form
        requiredMark={false}
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="profile-content__form"
      >
        <Flex vertical gap={20}>
          <Flex gap={20} wrap={isDesktop ? "nowrap" : "wrap"}>
            <Form.Item
              name="firstName"
              label="First name"
              rules={[
                {
                  required: true,
                  message: "Please enter your first name.",
                },
              ]}
              className="profile-content__field"
            >
              <Input placeholder="First name" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last name"
              rules={[
                {
                  required: true,
                  message: "Please enter your last name.",
                },
              ]}
              className="profile-content__field"
            >
              <Input placeholder="Last name" prefix={<UserOutlined />} />
            </Form.Item>
          </Flex>

          <Flex gap={20} wrap={isDesktop ? "nowrap" : "wrap"}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email.",
                },
                {
                  type: "email",
                  message: "Please enter a valid email.",
                },
              ]}
              className="profile-content__field"
            >
              <Input placeholder="Email" prefix={<MailOutlined />} />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                {
                  required: true,
                  message: "Please enter your phone number.",
                },
              ]}
              className="profile-content__field"
            >
              <Input placeholder="Phone" prefix={<PhoneOutlined />} />
            </Form.Item>
          </Flex>

          <Form.Item
            label="Profile picture"
            className="profile-content__upload"
          >
            <Flex gap={16} align="center">
              <Upload accept="image/*" maxCount={1} beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Upload picture</Button>
              </Upload>

              <Avatar size={48} icon={<UserOutlined />} />
            </Flex>
          </Form.Item>

          <Flex justify="end">
            <Button htmlType="submit" type="primary" loading={loading}>
              Save changes
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Content>
  );
}
