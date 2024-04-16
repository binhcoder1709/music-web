import { Button } from "@nextui-org/react";
import React from "react";
import { NavLink } from "react-router-dom";
import Login from "../../../components/Login/Login";
import Register from "../../../components/Register/Register";
import UserBar from "../../../components/UserBar/UserBar";
import { useSelector } from "react-redux";
import { selectToken } from "../../../redux/useSlice/authSlice";

export default function Header() {
  const token = useSelector(selectToken);
  return (
    <>
      <div className="flex bg-white items-center justify-around w-full h-[70px] border-b-2 border-gray-400">
        <div className="h-full">
          <img
            className="h-full"
            src="https://firebasestorage.googleapis.com/v0/b/mixsound-c081f.appspot.com/o/logos%2F3.png?alt=media&token=8bc8a22b-14a0-4ebc-958a-0896c25185eb"
            alt=""
          />
        </div>
        <nav className="flex gap-2">
          <NavLink to={"/"}>Trang chủ</NavLink>
          <NavLink to={"/library"}>Thư viện</NavLink>
        </nav>
        <div className="flex gap-2">
          {token == null ? (
            <>
              <Register />
              <Login />
            </>
          ) : (
            <UserBar token={token}/>
          )}
        </div>
      </div>
    </>
  );
}
