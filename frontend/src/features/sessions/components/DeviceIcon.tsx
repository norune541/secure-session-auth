import { UserOutlined } from "@ant-design/icons";
import { ChromeIcon } from "../../../common/assets/icons/ChromeIcon";
import { FirefoxIcon } from "../../../common/assets/icons/FirefoxIcon";
import { MicrosoftEdge } from "@dev.icons/react";

interface DeviceIconProps {
  device?: "Chrome" | "Firefox";
}

export const DeviceIcon = ({ device }: DeviceIconProps) => {
  if (!device) {
    return <UserOutlined />;
  }

  if (device.includes("Chrome")) {
    return <ChromeIcon />;
  }
  if (device.includes("Firefox")) {
    return <FirefoxIcon />;
  }
  if (device.includes("Edge")) {
    return <MicrosoftEdge />;
  }
};
