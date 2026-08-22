import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Button,
  Layout,
  Menu,
  theme,
  Divider,
  Form,
  Input,
  Flex,
  Typography,
} from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";

import {
  SidebarOpenIcon,
  SidebarCloseIcon,
} from "../../common/assets/icons/SidebarIcon";
import { SessionsIcon } from "../../common/assets/icons/SessionsIcon";
import { CompanyIcon } from "../../common/assets/icons/CompanyIcon";
import type { MenuProps } from "antd";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export function MeLayout() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenu: MenuProps["onClick"] = async ({ key }) => {
    switch (key) {
      case "user":
        navigate("/");
        break;
      case "sessions":
        navigate("/sessions");
        break;
    }
  };

  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          borderRadius: "24px",
          margin: "10px",
          background: colorBgContainer,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "14px",
          }}
        >
          <Button icon={<CompanyIcon />}></Button>
        </div>
        <Menu
          mode="inline"
          onClick={handleMenu}
          items={[
            {
              key: "user",
              icon: <UserOutlined></UserOutlined>,
              label: "User",
            },
            {
              key: "sessions",
              icon: <SessionsIcon />,
              label: "Sessions",
            },
          ]}
        ></Menu>
        <Button
          type="text"
          icon={collapsed ? <SidebarOpenIcon /> : <SidebarCloseIcon />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            position: "absolute",
            right: "-10px",
            top: "10%",
            transform: "translateY(-50%)",
            zIndex: 10,
            fontSize: "20px",
            background: "#ffffff",
            borderRadius: "50%",
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            margin: "16px",
            background: "#4929ff",
            borderRadius: "14px",
          }}
        >
          <Flex
            justify="start"
            align="center"
            gap="small"
            style={{ height: "100%" }}
          >
            <Form>
              <Form.Item style={{ marginBottom: "0px" }}>
                <Input placeholder="search" prefix={<SearchOutlined />}></Input>
              </Form.Item>
            </Form>
          </Flex>
        </Header>
        <Divider
          titlePlacement="start"
          style={{ padding: "5px 16px 5px 16px", margin: 0 }}
        >
          <Title level={4} style={{ margin: "0px 0px 12px 0px" }}>
            My profile
          </Title>
        </Divider>
        <Content
          style={{
            margin: "10px 16px",
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
