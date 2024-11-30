import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white shadow-md flex flex-col">
      <div className="p-4 text-xl font-bold text-center border-b">
        Admin Dashboard
      </div>
      <nav className="flex flex-col flex-1 p-4 space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `p-3 rounded hover:bg-gray-200 ${
              isActive ? "bg-gray-300 font-semibold" : ""
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/roles"
          className={({ isActive }) =>
            `p-3 rounded hover:bg-gray-200 ${
              isActive ? "bg-gray-300 font-semibold" : ""
            }`
          }
        >
          Roles
        </NavLink>
        <NavLink
          to="/permissions"
          className={({ isActive }) =>
            `p-3 rounded hover:bg-gray-200 ${
              isActive ? "bg-gray-300 font-semibold" : ""
            }`
          }
        >
          Permissions
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
