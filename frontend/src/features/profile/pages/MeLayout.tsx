import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { Button, Layout, Menu, Flex, Drawer, Typography } from "antd";
import type { MenuProps } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import { useMe } from "../hooks/useMe";
import "./MeLayout.css";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

/* Иконка сворачивания (Sidebar expanded -> Collapse action) */
function SidebarCollapseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <path d="m15 9-3 3 3 3" />
    </svg>
  );
}

/* Иконка разворачивания (Sidebar collapsed -> Expand action) */
function SidebarExpandIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <path d="m13 15 3-3-3-3" />
    </svg>
  );
}

function BrandLogo({ showText = true }: { showText?: boolean }) {
  return (
    <Flex align="center" gap={8} className="me-layout__brand">
      <svg
        fill="none"
        height="48"
        viewBox="0 0 37 48"
        width="30"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          clipRule="evenodd"
          d="m12.8841 4.30945-6.8842 3.97574 6.8891 3.97661 6.8862-3.97575zm8.8919 7.44025-6.887 3.9762-.0007 7.9532 6.8877-3.9771zm2 11.4164-6.8879 3.9772 6.8889 3.9765 6.8871-3.9763zm8.8879 7.4416-6.8868 3.9761v7.9522l6.8868-3.9761zm-10.8868 11.9287v-7.9525l-6.8891-3.9766v7.9525zm-10.8888-18.8569-6.8883-3.9775v-7.9526l6.889 3.9765zm-.0003 4.6187-9.38814-5.4209c-.928127-.5359-1.49986-1.5262-1.49986-2.598v-11.99368c0-.71444.381106-1.37463.999789-1.73193l10.383811-5.996798c.9281-.5359626 2.0716-.5361538 2.9998-.000505l10.3922 5.996973c.6193.3572 1.0004 1.0176 1.0004 1.73226v11.41638l9.888 5.7096c.6188.3573.9999 1.0176.9999 1.732v11.9937c0 1.0718-.5711 2.0621-1.5 2.598l-10.3868 5.9969c-.6187.3572-1.381.0001-1.9998.0001l-10.3891-5.9969c-.9283-.5359-1.5002-1.5263-1.5002-2.5982z"
          fill="#ea580c"
          fillRule="evenodd"
        />
      </svg>

      {showText && (
        <Title level={3} className="me-layout__brand-title">
          Clearpoint
        </Title>
      )}
    </Flex>
  );
}

export function MeLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    collapsed,
    showSidebarText,
    mobileMenuOpen,
    isDesktop,
    menuItems,
    handleCollapse,
    handleOpenMobileMenu,
    handleCloseMobileMenu,
  } = useMe();

  const selectedKey =
    location.pathname === "/" || location.pathname.startsWith("/profile")
      ? "settings"
      : location.pathname.startsWith("/sessions")
        ? "dashboard"
        : null;

  const handleNavigation: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "settings":
        navigate("/profile");
        break;

      case "dashboard":
        navigate("/sessions");
        break;

      default:
        return;
    }

    if (!isDesktop) {
      handleCloseMobileMenu();
    }
  };

  const menu = (
    <Menu
      mode="inline"
      theme="dark"
      selectedKeys={selectedKey ? [selectedKey] : []}
      onClick={handleNavigation}
      className="me-layout__menu"
      items={menuItems}
    />
  );

  return (
    <Layout className="me-layout">
      {isDesktop && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="me-layout__sider"
        >
          <Button
            type="text"
            icon={collapsed ? <SidebarExpandIcon /> : <SidebarCollapseIcon />}
            onClick={handleCollapse}
            className="me-layout__collapse-button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          />

          <BrandLogo showText={showSidebarText} />

          {menu}
        </Sider>
      )}

      {!isDesktop && (
        <Drawer
          title={<BrandLogo />}
          placement="left"
          onClose={handleCloseMobileMenu}
          open={mobileMenuOpen}
          size={250}
          className="me-layout__drawer"
          styles={{
            body: {
              padding: 0,
              background: "#0B132B",
            },
            header: {
              padding: "0 16px",
              background: "#0B132B",
              borderBottom: "none",
            },
          }}
        >
          {menu}
        </Drawer>
      )}

      <Layout className="me-layout__main">
        {!isDesktop && (
          <Header className="me-layout__mobile-header">
            <Flex align="center" className="me-layout__mobile-header-content">
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={handleOpenMobileMenu}
                className="me-layout__mobile-menu-button"
                aria-label="Open navigation menu"
              />
            </Flex>
          </Header>
        )}

        <Content className="me-layout__content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
