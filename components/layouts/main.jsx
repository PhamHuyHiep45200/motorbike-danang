"use client";
import React, { useEffect, useMemo, useState } from "react";
import Header from "./Header";
import { ConfigProvider, Spin } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { userGetMe } from "@/service/user";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { LoadingOutlined } from "@ant-design/icons";
const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;
function MainLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      getMe();
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const url = pathname + searchParams.toString();
    if (url) setLoading(false);
  }, [pathname, searchParams]);

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
      setLoading,
    };
  }, [user]);
  return (
    <CreateContext.Provider value={data}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#07c2b2",
          },
        }}
      >
        <Spin indicator={antIcon} spinning={loading}>
          <Header />
          <div style={{ marginTop: "calc(var(--header) + 20px)" }}>
            {children}
          </div>
        </Spin>
      </ConfigProvider>
    </CreateContext.Provider>
  );
}

export default MainLayout;
