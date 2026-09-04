import {
  Modal,
  Form,
  Input,
  Button,
  Flex,
  Divider,
  Avatar,
  Typography,
  Upload,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { usePatchUser } from "../hooks/usePatchUser";
import type { GetProp, ModalProps } from "antd";
import type { User } from "@repo/types";

const { Title, Text } = Typography;

export function PatchUserModal({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}) {
  const { loading, contextHolder, handleSubmit } = usePatchUser();
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
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
      styles={styles}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
      afterClose={() => {
        form.resetFields();
      }}
    >
      {contextHolder}
      <Avatar size={60} icon={<UserOutlined />} />
      <Title level={3}>
        {user.firstName} {user.lastName}
      </Title>
      <Text type="secondary">{user.email}</Text>

      <Divider />
      <Form
        onFinish={handleSubmit}
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          email: user.email,
        }}
      >
        <Form.Item label="Name">
          <Flex gap={20}>
            <Form.Item name="firstName" noStyle>
              <Input placeholder="First Name" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item name="lastName" noStyle>
              <Input placeholder="Last name" prefix={<UserOutlined />} />
            </Form.Item>
          </Flex>
        </Form.Item>
        <Divider />
        <Form.Item label="Email address" name="email">
          <Input placeholder="Email" prefix={<MailOutlined />} />
        </Form.Item>
        <Divider />
        <Form.Item label="Phone number" name="phone">
          <Input placeholder="Phone" prefix={<PhoneOutlined />} />
        </Form.Item>
        <Divider />

        {/* TODO: update profile picture */}
        <Form.Item label="Profile picture">
          <Flex gap={20}>
            <Upload>
              <Button
                icon={<UploadOutlined />}
                style={{ background: "#f8f8f8" }}
              >
                Upload
              </Button>
            </Upload>
            <Avatar icon={<UserOutlined />}></Avatar>
          </Flex>
        </Form.Item>
        <Divider />
        <Flex justify="right" gap={10}>
          <Button onClick={onClose}>Close</Button>

          <Button htmlType="submit" type="primary" loading={loading}>
            Save changes
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
}
