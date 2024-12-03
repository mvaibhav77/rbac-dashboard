import React, { useEffect, useState } from "react";
import { Permission } from "@/lib/types";
import {
  fetchPermissions,
  addPermission,
  updatePermission,
  deletePermission,
} from "@/api/api";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../components/ui/button";

const Permissions: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [currentPermission, setCurrentPermission] = useState<Permission | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const loadPermissions = async () => {
      const data = await fetchPermissions();
      setPermissions(data);
    };

    loadPermissions();
  }, []);

  const handleAddOrUpdate = async (name: string) => {
    if (currentPermission) {
      const updatedPermission = await updatePermission(currentPermission.id, {
        ...currentPermission,
        name,
      });
      setPermissions((prev) =>
        prev.map((permission) =>
          permission.id === updatedPermission.id
            ? updatedPermission
            : permission
        )
      );
    } else {
      const newPermission = await addPermission({ name });
      setPermissions((prev) => [...prev, newPermission]);
    }
    setIsDialogOpen(false);
    setCurrentPermission(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this permission?")) {
      await deletePermission(id);
      setPermissions((prev) =>
        prev.filter((permission) => permission.id !== id)
      );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Permissions</h1>
      <div className="mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="px-4 py-2 rounded "
              onClick={() => setCurrentPermission(null)}
            >
              Add Permission
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
                {currentPermission ? "Edit Permission" : "Add Permission"}
              </h2>
              <input
                type="text"
                name="name"
                defaultValue={currentPermission?.name || ""}
                required
                placeholder="Permission Name"
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex justify-end">
                <Button
                  variant={"secondary"}
                  className="mr-2 px-4 py-2 border rounded"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant={"default"}
                  type="submit"
                  className="px-4 py-2rounded"
                >
                  Save
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <ul className="space-y-3">
        {permissions.map((permission) => (
          <li
            key={permission.id}
            className="p-4 bg-white shadow-md rounded flex justify-between"
          >
            <span>{permission.name}</span>
            <div className="space-x-2">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => {
                  setCurrentPermission(permission);
                  setIsDialogOpen(true);
                }}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(permission.id)}
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

export default Permissions;
