import { Layout, Flex, theme, Typography, Divider, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { User } from "@repo/types";

const { Header, Content } = Layout;
const { Text, Title } = Typography;

export function ProfileComponent({ content }: { content: User }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          background: colorBgContainer,
          height: "fit-content",
          borderRadius: "14px",
        }}
      >
        <Flex
          gap="large"
          style={{ padding: 20, paddingLeft: 0 }}
          align="center"
        >
          <Avatar size={72} icon={<UserOutlined />}></Avatar>
          <Flex vertical gap="small">
            <Text>Name: {content.name}</Text>
            <Text>Role: {content.role}</Text>
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
        }}
      >
        <Title level={3} style={{ color: "#4929ff" }}>
          Personal Information
        </Title>
        <Divider />
      </Content>
    </Layout>
  );
}
