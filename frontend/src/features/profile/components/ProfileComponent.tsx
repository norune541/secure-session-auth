import { useState } from "react";
import {
  Layout,
  Flex,
  Typography,
  Divider,
  Avatar,
  Descriptions,
  Badge,
  Grid,
} from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

import { PatchUserModal } from "./PatchUserModal";
import type { DescriptionsProps } from "antd";
import type { User } from "@repo/types";

const { Header, Content } = Layout;
const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

export function ProfileComponent({ content }: { content: User }) {
  const [isChangeUserOpen, setIsChangeUserOpen] = useState(false);
  const screens = useBreakpoint();
  const isDesktop = screens.md;

  const mobileStyles: React.CSSProperties = {
    background: "#f8f8f8",
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 16,
  };

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "First Name",
      children: (
        <span style={!isDesktop ? mobileStyles : undefined}>
          {content.firstName}
        </span>
      ),
    },
    {
      key: "2",
      label: "Last Name",
      children: (
        <span style={!isDesktop ? mobileStyles : undefined}>
          {content.lastName}
        </span>
      ),
    },
    {
      key: "3",
      label: "Email",
      children: (
        <span style={!isDesktop ? mobileStyles : undefined}>
          {content.email}
        </span>
      ),
    },
    {
      key: "4",
      label: "Phone",
      children: (
        <span style={!isDesktop ? mobileStyles : undefined}>
          {content.phone}
        </span>
      ),
    },
    {
      key: "5",
      label: "Role",
      children: (
        <span style={!isDesktop ? mobileStyles : undefined}>
          {content.role}
        </span>
      ),
    },
  ];

  return (
    <Layout>
      <Header
        style={{
          background: "#fff",
          height: "fit-content",
          borderRadius: "14px",
          paddingLeft: 28,
        }}
      >
        <Flex gap="large" style={{ paddingLeft: 0 }} align="center">
          <div style={{ cursor: "pointer" }}>
            <Badge
              count={<EditOutlined style={{ fontSize: 20 }} />}
              offset={[-10, 60]}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 5,
              }}
              onClick={() => setIsChangeUserOpen(true)}
            >
              {/* TODO: add profile picture */}
              <Avatar size={72} icon={<UserOutlined />} />
            </Badge>
          </div>
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
          marginTop: "20px",
          borderRadius: "14px",
          paddingLeft: "10px",
          paddingRight: "16px",
        }}
      >
        <Title level={3} style={{ color: "#4929ff" }}>
          Personal Information
        </Title>
        <Divider />
        <Descriptions
          items={items}
          layout="vertical"
          size={isDesktop ? "default" : "small"}
          styles={{
            label: { paddingBottom: 0, fontWeight: "bold" },
            content: { paddingBottom: 0 },
          }}
        />
      </Content>
    </Layout>
  );
}
