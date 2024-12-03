import React, { useEffect, useState } from "react";
import { Role } from "@/lib/types";
import { fetchRoles, addRole, updateRole, deleteRole } from "@/api/api";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../components/ui/button";

const Roles: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const loadRoles = async () => {
      const data = await fetchRoles();
      setRoles(data);
    };

    loadRoles();
  }, []);

  const handleAddOrUpdate = async (name: string) => {
    if (currentRole) {
      const updatedRole = await updateRole(currentRole.id, {
        ...currentRole,
        name,
      });
      setRoles((prev) =>
        prev.map((role) => (role.id === updatedRole.id ? updatedRole : role))
      );
    } else {
      const newRole = await addRole({ name });
      setRoles((prev) => [...prev, newRole]);
    }
    setIsDialogOpen(false);
    setCurrentRole(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      await deleteRole(id);
      setRoles((prev) => prev.filter((role) => role.id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Roles</h1>
      <div className="mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className=" text-white px-4 py-2 rounded"
              onClick={() => setCurrentRole(null)}
            >
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const name = formData.get("name") as string;
                handleAddOrUpdate(name);
              }}
            >
              <h2 className="text-xl font-bold mb-2">
                {currentRole ? "Edit Role" : "Add Role"}
              </h2>
              <input
                type="text"
                name="name"
                defaultValue={currentRole?.name || ""}
                required
                placeholder="Role Name"
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex justify-end">
                <Button
                  variant={"secondary"}
                  className="mr-2 px-4 py-2 border rounded "
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="px-4 py-2 rounded">
                  Save
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <ul className="space-y-3">
        {roles.map((role) => (
          <li
            key={role.id}
            className="p-4 bg-white shadow-md rounded flex justify-between"
          >
            <span>{role.name}</span>
            <div className="space-x-2">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => {
                  setCurrentRole(role);
                  setIsDialogOpen(true);
                }}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(role.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Roles;
