import { Typography, Modal, Flex, Button } from "antd";

const { Title, Text } = Typography;

export function LogoutModal({ isOpen, onClose }) {
  return (
    <Modal
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
      centered
      style={{ maxWidth: 400 }}
      footer={null}
      width={{
        xs: "90%",
        sm: 416,
      }}
    >
      <Flex vertical align="center">
        <Title level={3}>Log out</Title>
        <Text>Are you sure you want to log out?</Text>
        <Flex gap={30} style={{ marginTop: 25 }} justify="center">
          <Button onClick={onClose}>Cancel</Button>
          <Button>Log out</Button>
        </Flex>
      </Flex>
    </Modal>
  );
}
