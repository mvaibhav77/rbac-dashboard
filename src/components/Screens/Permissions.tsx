import React, { useEffect, useState } from "react";
import { Permission } from "@/lib/types";
import { fetchPermissions } from "@/api/api";

const Permissions: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    const loadPermissions = async () => {
      const data = await fetchPermissions();
      setPermissions(data);
    };

    loadPermissions();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Permissions</h1>
      <ul className="space-y-3">
        {permissions.map((permission) => (
          <li key={permission.id} className="p-4 bg-white shadow-md rounded">
            <h2 className="font-bold">{permission.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Permissions;
