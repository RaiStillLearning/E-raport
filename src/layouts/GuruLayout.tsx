import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const sidebarWidth = 220;
const toggleWidth = 40;

export default function GuruLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Passing function toggle ke Sidebar supaya bisa toggle dari sidebar
  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={handleToggleSidebar} />
      <div
        style={{
          marginLeft: sidebarOpen ? sidebarWidth + toggleWidth : toggleWidth,
          transition: "margin-left 0.3s ease-in-out",
          padding: "1rem",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </div>
    </>
  );
}
