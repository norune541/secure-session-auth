import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "antd";
import type { MenuProps } from "antd";
import { SettingOutlined } from "@ant-design/icons";

import { DashboardIcon } from "../../../common/assets/icons/DashboardIcon";

const { useBreakpoint } = Grid;

export function useMe() {
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const [collapsed, setCollapsed] = useState(false);
  const [showSidebarText, setShowSidebarText] = useState(!collapsed);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDesktop = screens.md;

  useEffect(() => {
    if (collapsed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowSidebarText(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowSidebarText(true);
    }, 150);

    return () => clearTimeout(timer);
  }, [collapsed]);

  const handleMenu: MenuProps["onClick"] = ({ key }) => {
    setMobileMenuOpen(false);

    switch (key) {
      case "settings":
        navigate("/");
        break;

      case "dashboard":
        navigate("/sessions");
        break;
    }
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      key: "dashboard",
      icon: <DashboardIcon />,
      label: "Dashboard",
    },
  ];

  const handleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const handleOpenMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  return {
    collapsed,
    showSidebarText,
    isPasswordModalOpen,
    mobileMenuOpen,
    isDesktop,
    menuItems,

    handleMenu,
    handleCollapse,
    handleOpenMobileMenu,
    handleCloseMobileMenu,
    handleClosePasswordModal,
  };
}
