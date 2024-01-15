import React, { useState } from "react";
import Logo from "../images/logo.png";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const menus = [
    { name: "개발 알림", path: "/alarm" },
    { name: "투두리스트", path: "/todo" },
    { name: "소셜", path: "/social" },
  ];

  return (
    <div className="Sidebar">
      {/*logo*/}
      <div className="logo">
        <img src={Logo} alt="" />
        <span>TITLE</span>
      </div>
      <div className="menu">
        {menus.map((menu, index) => {
          console.log(menu.path);
          return (
            <Link
              to={`/home${menu.path}`}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <SidebarItem menu={menu} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
