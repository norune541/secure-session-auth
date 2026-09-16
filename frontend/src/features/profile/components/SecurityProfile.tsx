import { useState } from "react";
import { Typography, Button, Layout, Divider } from "antd";

import { PasswordModal } from "./PasswordModal";

const { Title } = Typography;
const { Content } = Layout;

export function SecurityProfile() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <Content style={{ marginLeft: 28, marginTop: 20, maxWidth: 500 }}>
      <Title level={3}>Security</Title>
      <Divider />
      <Title level={4} style={{ color: "black" }}>
        Password
      </Title>
      <Button
        style={{ minWidth: 300 }}
        onClick={() => setIsPasswordModalOpen(true)}
      >
        Change password
      </Button>
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </Content>
  );
}
