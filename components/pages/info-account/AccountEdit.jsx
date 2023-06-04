import { CreateContext } from "@/context/ContextProviderGlobal";
import { updateUser } from "@/service/user";
import { Button, Form, Input } from "antd";
import React, { useContext, useEffect } from "react";

function AccountEdit({ editForm }) {
  const [form] = Form.useForm();
  const { user, setUserData } = useContext(CreateContext);
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user, form]);
  const editInfo = async (e) => {
    try {
      const response = await updateUser(localStorage.getItem("userId"), e);
      if (response.data && response.data.status === 200) {
        setUserData(response.data.data);
        editForm(false);
      } else {
        console.log(reponse);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Form form={form} onFinish={editInfo}>
        <Form.Item name="name" label="Họ Và Tên">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="phone" label="Số Điện Thoại">
          <Input size="large" />
        </Form.Item>
        <div className="flex items-center space-x-[10px] mt-10">
          <Button
            onClick={() => editForm(false)}
            size="large"
            className="!w-full"
          >
            Quay lại
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            className="!w-full bg-primary"
          >
            Chỉnh sửa
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AccountEdit;
