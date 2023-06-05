"use client";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { loginUser } from "@/service/user";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

function Login() {
  const { setLoading, errorNoti } = useContext(CreateContext);
  const router = useRouter();
  const redirectRegister = (path) => {
    router.push("/auth/register");
    setLoading(true);
  };
  const submit = async (e) => {
    try {
      const response = await loginUser(e);
      if (response.data && response.data.status === 200) {
        if (localStorage.getItem("userId")) {
          localStorage.removeItem("userId");
        }
        await localStorage.setItem("userId", response.data.data.id);
        setLoading(true);
        router.push("/");
      } else {
        errorNoti(response.data.message);
      }
    } catch (error) {
      errorNoti(error);
    }
  };
  return (
    <div>
      <Form onFinish={submit}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Không được bỏ trống!" },
            { type: "email", message: "Bắt buộc email" },
          ]}
        >
          <Input size="large" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input.Password size="large" placeholder="Mật khẩu" />
        </Form.Item>
        <span
          className="block text-right text-[white] underline underline-offset-1 font-medium"
          onClick={redirectRegister}
        >
          Đăng kí tài khoản
        </span>
        <Button
          className="w-full !bg-primary !mt-5 !font-medium !text-[white]"
          size="large"
          htmlType="submit"
        >
          Đăng Nhập
        </Button>
      </Form>
    </div>
  );
}

export default Login;
