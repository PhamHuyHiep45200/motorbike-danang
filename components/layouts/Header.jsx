"use client";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { listHeader } from "@/data/header";
import { UserOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

function Header() {
  const {user} = useContext(CreateContext);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const redirect = (path) => {
    if(path==='/auth/login'){
      localStorage.clear()
    }
    router.push(path);
    onClose();
  };
  return (
    <div
      className="flex items-center justify-between fixed top-0 right-0 left-0 px-5 bg-[black] bg-opacity-50"
      style={{ height: "var(--header)" }}
    >
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
        <Image width={40} height={40} src="/image/logo.jpeg" alt="" />
      </div>
      <div
        className="w-[30px] h-[30px] rounded-full overflow-hidden border-[2px] border-primary flex items-center justify-center cursor-pointer"
        onClick={showDrawer}
      >
        <UserOutlined className="!text-primary" />
      </div>
      <Drawer placement="right" width="90%" open={open} onClose={onClose}>
        <div className="flex flex-col justify-between h-[100%]">
          <div>
            {listHeader.map((e) => {
              return (
                <div
                  key={e.path}
                  onClick={() => redirect(e.path)}
                  className="flex items-center space-x-[20px] h-[60px] border-b-[1px] border-[#eaeaea] cursor-pointer"
                >
                  <div className="text-primary flex items-center text-[20px]">
                    {e.icon}
                  </div>
                  <span className="text-[16px]">{e.name}</span>
                </div>
              );
            })}
          </div>
          <span className="font-medium text-center text-[14px] text-[#ccc]">
            @Motoby xin chào {user?.name || "bạn"}
          </span>
        </div>
      </Drawer>
    </div>
  );
}

export default Header;
