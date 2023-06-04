"use client";
import React, { useEffect, useMemo, useState } from "react";
import Header from "./Header";
import { ConfigProvider, Spin } from "antd";
import { useRouter } from "next/navigation";
import { userGetMe } from "@/service/user";
import { CreateContext } from "@/context/ContextProviderGlobal";

function MainLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("oke", localStorage.getItem("userId"));
    if (localStorage.getItem("userId")) {
      getMe();
    } else {
      setUser(null);
    }
  }, [localStorage.getItem("userId")]);
  const getMe = async () => {
    try {
      const response = await userGetMe(localStorage.getItem("userId"));
      if (response.data && response.data.status === 200) {
        setUser(response.data.data);
      } else {
        router.push("auth/login");
      }
    } catch (error) {
      router.push("auth/login");
    }
  };
  const setUserData = (data) => {
    setUser(data);
  };
  const data = useMemo(() => {
    return {
      user,
      setUserData,
    };
  }, [user]);
  console.log(user);
  return (
    <CreateContext.Provider value={data}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#07c2b2",
          },
        }}
      >
        <Header />
        <div style={{ marginTop: "calc(var(--header) + 20px)" }}>
          {children}
        </div>
      </ConfigProvider>
    </CreateContext.Provider>
  );
}

export default MainLayout;
