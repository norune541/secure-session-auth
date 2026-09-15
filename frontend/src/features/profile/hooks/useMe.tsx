import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "antd";
import type { MenuProps } from "antd";
import {
  UserOutlined,
  LockOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import { SessionsIcon } from "../../../common/assets/icons/SessionsIcon";

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
      case "user":
        navigate("/");
        break;

      case "sessions":
        navigate("/sessions");
        break;

      case "changePassword":
        setIsPasswordModalOpen(true);
        break;

      case "activityLogs":
        navigate("sessions/activity");
        break;
    }
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "mainGroup",
      label: "Main",
      type: "group",
    },
    {
      key: "user",
      icon: <UserOutlined />,
      label: "User",
    },
    {
      key: "sessions",
      icon: <SessionsIcon />,
      label: "Sessions",
    },
    {
      key: "settingsGroup",
      label: "Security",
      type: "group",
    },
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
