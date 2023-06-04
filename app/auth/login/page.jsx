"use client";
import { loginUser } from "@/service/user";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

function Login() {
  const router = useRouter();
  const redirectRegister = (path) => {
    router.push("/auth/register");
  };
  const submit = async (e)=>{
    try {
      const response = await loginUser(e)
      if(response.data && response.data.status===200){
        if(localStorage.getItem('userId')){
          localStorage.removeItem('userId')
        }
        await localStorage.setItem('userId', response.data.data.id)
        router.push('/')
      }else{
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Form onFinish={submit}>
        <Form.Item name="email">
          <Input size="large" placeholder="Email" />
        </Form.Item>
        <Form.Item name="password">
          <Input size="large" placeholder="Mật khẩu" />
        </Form.Item>
        <span
          className="block text-right text-[white] underline underline-offset-1 font-medium"
          onClick={redirectRegister}
        >
          Đăng kí tài khoản
        </span>
        <Button className="w-full !bg-primary !mt-5 !font-medium !text-[white]" size="large" htmlType="submit">
          Đăng Nhập
        </Button>
      </Form>
    </div>
  );
}

export default Login;
