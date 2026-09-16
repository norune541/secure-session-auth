import { Form } from "antd";
import { useState } from "react";

import { usePatchUser } from "./usePatchUser";
import type { MenuProps } from "antd";

export const useProfileNavigation = () => {
  const [current, setCurrent] = useState("profile");
  const [form] = Form.useForm();

  const { loading, handleSubmit } = usePatchUser();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return {
    current,
    onClick,
    form,
    loading,
    handleSubmit,
  };
};
