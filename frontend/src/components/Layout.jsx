import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  DocumentTextIcon,
  InboxIcon,
  ArchiveBoxIcon, // ganti ArchiveIcon
  UserGroupIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Layout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = user.role;

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: HomeIcon,
      roles: ["admin", "pimpinan", "staff"],
    },
    {
      name: "Semua Surat",
      path: "/surat",
      icon: DocumentTextIcon,
      roles: ["admin", "pimpinan", "staff"],
    },
    {
      name: "Input Surat",
      path: "/surat/input",
      icon: InboxIcon,
      roles: ["admin", "staff"],
    }, // untuk admin dan staff
    {
      name: "Tugas Disposisi",
      path: "/tugas",
      icon: InboxIcon,
      roles: ["staff"],
    },
    {
      name: "Arsip",
      path: "/arsip",
      icon: ArchiveBoxIcon,
      roles: ["admin", "pimpinan", "staff"],
    },
    {
      name: "Manajemen User",
      path: "/users",
      icon: UserGroupIcon,
      roles: ["admin"],
    },
    {
      name: "Laporan PDF",
      path: "/laporan",
      icon: ChartBarIcon,
      roles: ["admin", "pimpinan", "staff"],
    },
  ];

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white flex flex-col shadow-xl">
        <div className="p-5 text-2xl font-bold border-b border-blue-700">
          Surat Digital
        </div>
        <nav className="flex-1 mt-6">
          {menu.map(
            (item) =>
              item.roles.includes(userRole) && (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center px-4 py-3 text-sm hover:bg-blue-700 transition"
                >
                  <item.icon className="w-5 h-5 mr-3" /> {item.name}
                </Link>
              ),
          )}
        </nav>
        <button
          onClick={logout}
          className="flex items-center px-4 py-3 text-sm hover:bg-blue-700 border-t border-blue-700"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" /> Logout
        </button>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <Outlet />
      </div>
    </div>
  );
}
