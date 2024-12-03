import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white shadow-md flex flex-col">
      <h1 className="px-4 py-6">
        <NavLink to="/" className="text-2xl font-bold text-center border-b">
          Admin Dashboard
        </NavLink>
      </h1>

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
          to="/users"
          className={({ isActive }) =>
            `p-3 rounded hover:bg-gray-200 ${
              isActive ? "bg-gray-300 font-semibold" : ""
            }`
          }
        >
          All Users
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
