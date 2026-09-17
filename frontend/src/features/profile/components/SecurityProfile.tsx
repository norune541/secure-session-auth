import { useState } from "react";
import {
  Typography,
  Button,
  Layout,
  Divider,
  Flex,
  ConfigProvider,
} from "antd";

import { PasswordModal } from "./PasswordModal";

const { Title } = Typography;
const { Content } = Layout;

export function SecurityProfile() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <Content
      style={{ marginLeft: 28, marginTop: 20, marginRight: 28, maxWidth: 500 }}
    >
      <Title level={3}>Security</Title>
      <Divider />

      <Flex vertical gap={5}>
        <Title level={4} style={{ color: "black", marginTop: 0 }}>
          Password
        </Title>
        <Button
          onClick={() => {
            setIsPasswordModalOpen(true);
          }}
        >
          Change password
        </Button>
        <Divider />
        <Title level={4} style={{ color: "black", marginTop: 0 }}>
          Logout
        </Title>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorText: "red",
                colorBorder: "red",

                defaultHoverBorderColor: "#ff4d4f",
                defaultHoverBg: "#fff1f0",
                defaultHoverColor: "#ff4d4f",

                defaultActiveColor: "#cf1322",
                defaultActiveBorderColor: "#cf1322",
                defaultActiveBg: "#fff1f0",
              },
            },
          }}
        >
          <Button>Logout</Button>
        </ConfigProvider>
      </Flex>
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </Content>
  );
}
