import { HistoryOutlined, KeyOutlined, LogoutOutlined, SmileOutlined } from "@ant-design/icons";

export const listHeader = [
  {
    icon: <SmileOutlined />,
    name: "Tài Khoản Của Tôi",
    path: "/info-account",
  },
  {
    icon: <HistoryOutlined />,
    name: "Lịch Sử Thuê Xe",
    path: "/history",
  },
  {
    icon: <KeyOutlined />,
    name: "Thay đổi mật khẩu",
    path: "/change-password",
  },
  {
    icon: <LogoutOutlined />,
    name: "Đăng xuất",
    path: "/auth/login",
  },
];
