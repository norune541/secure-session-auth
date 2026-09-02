import { Modal, Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { usePasswordModal } from "../hooks/usePasswordModal";

export function PasswordModal({ isOpen, onClose }) {
  const { loading, success, handleSubmit, contextHolder } = usePasswordModal();

  return (
    <Modal
      centered
      title="Change Password"
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
    >
      {contextHolder}
      <p>Here you can change your password.</p>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="currentPassword"
          label="Current password"
          rules={[
            {
              required: true,
              message: "Please write password!",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />}></Input.Password>
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New password"
          rules={[
            {
              required: true,
              message: "Please write password!",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />}></Input.Password>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Change password
          </Button>
        </Form.Item>
      </Form>
      {success && <span>{success}</span>}
    </Modal>
  );
}
