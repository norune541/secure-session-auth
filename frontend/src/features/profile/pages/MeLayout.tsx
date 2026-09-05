import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Button,
  Layout,
  Menu,
  theme,
  Divider,
  Flex,
  Typography,
  Grid,
  Drawer,
} from "antd";
import {
  UserOutlined,
  MenuOutlined,
  LockOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import { SessionsIcon } from "../../../common/assets/icons/SessionsIcon";
import { CompanyIcon } from "../../../common/assets/icons/CompanyIcon";
import { PasswordModal } from "../components/PasswordModal";
import type { MenuProps } from "antd";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

export function MeLayout() {
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const isDesktop = screens.md;

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenu: MenuProps["onClick"] = async ({ key }) => {
    setMobileMenuOpen(false);
    switch (key) {
      case "user":
        navigate("/");
        break;
      case "sessions":
        navigate("/sessions");
        break;
      case "changePassword":
        setIsPasswordModalOpen(true);
    }
  };

  // TODO: Implement session activity logs
  // - Create `useActivityLogs` hook for data fetching
  // - Design and build the Activity Logs page component
  const menuItems = (
    <Menu
      mode="inline"
      onClick={handleMenu}
      style={{ border: 0 }}
      items={[
        { key: "mainGroup", label: "Main", type: "group" },
        { key: "user", icon: <UserOutlined />, label: "User" },
        { key: "sessions", icon: <SessionsIcon />, label: "Sessions" },
        { key: "settingsGroup", label: "Settings", type: "group" },
        {
          key: "changePassword",
          icon: <LockOutlined />,
          label: "Change Password",
        },
        {
          key: "activityLogs",
          icon: <ClockCircleOutlined />,
          label: "Activity Logs",
        },
      ]}
    />
  );

  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
      {isDesktop && (
        <Sider
          trigger={null}
          collapsible
          style={{
            background: colorBgContainer,
            position: "relative",
            borderRight: "1px solid #F0F0F0",
          }}
        >
          <Button style={{ margin: 20 }} icon={<CompanyIcon />}>
            Company name
          </Button>
          {menuItems}
        </Sider>
      )}

      {!isDesktop && (
        <Drawer
          title={<Button icon={<CompanyIcon />}>Company name</Button>}
          placement="left"
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
          styles={{ body: { padding: 0 } }}
          size={250}
        >
          {menuItems}
        </Drawer>
      )}

      <Layout>
        <Header
          style={{
            padding: isDesktop ? "0 0px" : "0 12px",
            background: "#ffffff",
            borderRadius: "14px",
          }}
        >
          <Flex
            justify="start"
            align="center"
            gap="small"
            style={{ height: "100%" }}
          >
            {!isDesktop && (
              <Button
                type="text"
                icon={
                  <MenuOutlined
                    style={{ color: "#000000", fontSize: "18px" }}
                  />
                }
                onClick={() => setMobileMenuOpen(true)}
              />
            )}
          </Flex>
        </Header>

        <Divider
          titlePlacement="start"
          style={{ padding: isDesktop ? "5px 16px" : "5px 10px", margin: 0 }}
        >
          <Title
            level={isDesktop ? 4 : 5}
            style={{ margin: "0px 0px 12px 0px" }}
          >
            My profile
          </Title>
        </Divider>

        <Content
          style={{
            margin: isDesktop ? "10px 16px" : "10px",
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
