import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  DocumentTextIcon,
  InboxIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar({ user, logout }) {
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
      roles: ["staff", "admin"],
    },
    {
      name: "Tugas Disposisi",
      path: "/tugas",
      icon: InboxIcon,
      roles: ["staff"],
    },
    {
      name: "Arsip",
      path: "/arsip",
      icon: DocumentTextIcon,
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
  return (
    <div className="w-64 bg-indigo-800 text-white flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-indigo-700">
        Surat Digital
      </div>
      <nav className="flex-1 mt-4">
        {menu.map(
          (item) =>
            item.roles.includes(user.role) && (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm ${isActive ? "bg-indigo-900" : "hover:bg-indigo-700"}`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            ),
        )}
      </nav>
      <button
        onClick={logout}
        className="flex items-center px-4 py-3 text-sm hover:bg-indigo-700 border-t border-indigo-700"
      >
        <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" /> Logout
      </button>
    </div>
  );
}
