import { useState } from "react";
import {
  Layout,
  Flex,
  theme,
  Typography,
  Divider,
  Avatar,
  Descriptions,
  Badge,
} from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

import { PatchUserModal } from "./PatchUserModal";
import type { DescriptionsProps } from "antd";
import type { User } from "@repo/types";

const { Header, Content } = Layout;
const { Text, Title } = Typography;

export function ProfileComponent({ content }: { content: User }) {
  const [isChangeUserOpen, setIsChangeUserOpen] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "First Name",
      children: content.firstName,
    },
    {
      key: "2",
      label: "Last Name",
      children: content.lastName,
    },
    {
      key: "3",
      label: "Email",
      children: content.email,
    },
    {
      key: "4",
      label: "Phone",
      children: content.phone,
    },
    {
      key: "5",
      label: "Role",
      children: content.role,
    },
  ];

  return (
    <Layout>
      <Header
        style={{
          background: colorBgContainer,
          height: "fit-content",
          borderRadius: "14px",
        }}
      >
        <Flex gap="large" style={{ paddingLeft: 0 }} align="center">
          <Badge
            count={<EditOutlined style={{ fontSize: 20 }} />}
            offset={[-10, 60]}
            style={{ background: "#fff", borderRadius: 16, padding: 5 }}
            onClick={() => setIsChangeUserOpen(true)}
          >
            <Avatar size={72} icon={<UserOutlined />} />
          </Badge>

          {
            <PatchUserModal
              user={content}
              isOpen={isChangeUserOpen}
              onClose={() => setIsChangeUserOpen(false)}
            />
          }
          <Flex vertical gap="small">
            <Text>
              {content.firstName} {content.lastName}
            </Text>
            <Text>{content.role}</Text>
          </Flex>
        </Flex>
      </Header>
      <Content
        style={{
          background: colorBgContainer,
          marginTop: "20px",
          borderRadius: "14px",
          paddingLeft: "50px",
          paddingRight: "50px",
          paddingBottom: "30px",
        }}
      >
        <Title level={3} style={{ color: "#4929ff" }}>
          Personal Information
        </Title>
        <Divider />
        <Descriptions items={items} layout="vertical" />
      </Content>
    </Layout>
  );
}
