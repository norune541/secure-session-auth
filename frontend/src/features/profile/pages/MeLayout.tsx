import { Outlet, useLocation } from "react-router-dom";
import { Button, Layout, Menu, Flex, Drawer, Typography } from "antd";
import {
  MenuOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";

import { useMe } from "../hooks/useMe";

const { Title } = Typography;
const { Header, Sider, Content } = Layout;

export function MeLayout() {
  const location = useLocation();
  const {
    collapsed,
    showSidebarText,
    mobileMenuOpen,
    isDesktop,
    menuItems,

    handleMenu,
    handleCollapse,
    handleOpenMobileMenu,
    handleCloseMobileMenu,
  } = useMe();

  const selectedKey =
    location.pathname === "/"
      ? "settings"
      : location.pathname === "/sessions"
        ? "dashboard"
        : null;

  const menu = (
    <Menu
      mode="inline"
      selectedKeys={selectedKey ? [selectedKey] : []}
      onClick={handleMenu}
      style={{ border: 0, marginTop: 20 }}
      items={menuItems}
    />
  );

  return (
    <Layout style={{ minHeight: "100dvh" }}>
      {isDesktop && (
        <Sider
          trigger={null}
          collapsed={collapsed}
          collapsible
          style={{
            background: "#ffff",
            borderRight: "1px solid #F0F0F0",
            marginTop: 15,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <RightCircleOutlined /> : <LeftCircleOutlined />}
            onClick={handleCollapse}
            style={{
              position: "absolute",
              right: -16,
              top: 45,
              zIndex: 10,
              fontSize: "20px",
              width: 32,
              height: 32,
              padding: 0,
              background: "#fff",
              borderRadius: "50%",
            }}
          />
          <Flex align="center" gap={8} style={{ margin: "10px 0 10px 20px" }}>
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

            {showSidebarText && (
              <Title level={3} style={{ margin: 0 }}>
                Clearpoint
              </Title>
            )}
          </Flex>

          {menu}
        </Sider>
      )}

      {!isDesktop && (
        <Drawer
          title={
            <Flex align="center" gap={8}>
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

              <Title level={3} style={{ margin: 0 }}>
                Clearpoint
              </Title>
            </Flex>
          }
          placement="left"
          onClose={handleCloseMobileMenu}
          open={mobileMenuOpen}
          styles={{ body: { padding: 0 } }}
          size={250}
        >
          {menu}
        </Drawer>
      )}

      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            padding: isDesktop ? "0" : "25px 0 10px 20px",
            background: "#ffffff",
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
                onClick={handleOpenMobileMenu}
              />
            )}
          </Flex>
        </Header>

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
