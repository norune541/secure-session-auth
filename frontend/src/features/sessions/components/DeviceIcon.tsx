import { UserOutlined } from "@ant-design/icons";
import { MicrosoftEdge, Firefox, Chrome } from "@dev.icons/react";

export const DeviceIcon = ({
  device,
  size,
}: {
  device: string;
  size?: number;
}) => {
  if (!device) {
    return <UserOutlined />;
  }

  if (device.includes("Chrome")) {
    return <Chrome size={size} />;
  }
  if (device.includes("Firefox")) {
    return <Firefox size={size} />;
  }
  if (device.includes("Edge")) {
    return <MicrosoftEdge size={size} />;
  }
};
