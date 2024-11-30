import React, { useEffect, useState } from "react";
import { Role } from "@/lib/types";
import { fetchRoles } from "@/api/api";

const Roles: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const loadRoles = async () => {
      const data = await fetchRoles();
      setRoles(data);
    };

    loadRoles();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Roles</h1>
      <ul className="space-y-3">
        {roles.map((role) => (
          <li key={role.id} className="p-4 bg-white shadow-md rounded">
            <h2 className="font-bold">{role.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Roles;
