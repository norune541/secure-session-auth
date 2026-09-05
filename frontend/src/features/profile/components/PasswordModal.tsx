import { Modal, Form, Input, Button, Flex, Typography, Divider } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { usePasswordModal } from "../hooks/usePasswordModal";
import type { GetProp, ModalProps } from "antd";

const { Text } = Typography;

export function PasswordModal({ isOpen, onClose }) {
  const { loading, handleSubmit, contextHolder } = usePasswordModal(onClose);
  const [form] = Form.useForm();

  const styles: ModalProps["styles"] = (
    info,
  ): GetProp<ModalProps, "styles", "Return"> => {
    if (info.props.title) {
      return {
        title: {
          color: "#4929ff",
        },
      };
    }
    return {};
  };

  return (
    <Modal
      centered
      title="Change Password"
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
      styles={styles}
      afterClose={() => {
        form.resetFields();
      }}
    >
      {contextHolder}
      <Text>Here you can change your password.</Text>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        style={{ marginTop: 20 }}
        form={form}
      >
        <Divider />
        <Form.Item
          name="currentPassword"
          label="Current password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter your current password"
            autoComplete="current-password"
            prefix={<LockOutlined />}
          ></Input.Password>
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter new password"
            autoComplete="new-password"
            prefix={<LockOutlined />}
          ></Input.Password>
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm password"
          dependencies={["newPassword"]}

          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm password"
            prefix={<LockOutlined />}
            type="password"
          />
        </Form.Item>
        <Divider />

        <Flex justify="right" gap={10}>
          <Button onClick={onClose}>Close</Button>
          <Form.Item>
            <Button htmlType="submit" type="primary" loading={loading}>
              Change password
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
}
