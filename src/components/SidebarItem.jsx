import React from "react";
import "./Sidebar.css";

function SidebarItem({ menu }) {
  return (
    <div className="menuItem">
      <p>{menu.name}</p>
    </div>
  );
}

export default SidebarItem;