import React from "react";
import {
  User,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  cn,
} from "@nextui-org/react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearToken } from "../../redux/useSlice/authSlice";

export default function UserBar({ token }) {
  const decoded = jwtDecode(token);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearToken());
  };
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <User
            className="cursor-pointer hover:bg-gray-200 p-2"
            name={decoded.userName}
            description={decoded.email}
            avatarProps={{
              src: `${decoded.avatar}`,
            }}
          />
        </DropdownTrigger>
        <DropdownMenu
          variant="faded"
          aria-label="Dropdown menu with description"
        >
          <DropdownItem key="new">Thông tin cá nhân</DropdownItem>
          <DropdownItem key="upload">
            <Link to={"/upload"}>Tải nhạc</Link>
          </DropdownItem>
          <DropdownItem key="edit" showDivider>
            Cài đặt
          </DropdownItem>
          <DropdownItem
            key="logout"
            onClick={handleLogout}
            className="text-danger"
            color="danger"
          >
            Đăng xuất
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
