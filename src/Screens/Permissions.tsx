import React, { useEffect, useState } from "react";
import {
  fetchHierarchicalPermissions,
  addPermissionLevel,
  updatePermissionLevel,
  deletePermissionLevel,
} from "@/api/api";
import { Permission } from "@/lib/types";
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { Input } from "@/components/ui/input"; // shadcn/ui Input
import { Select, SelectItem, SelectTrigger } from "@/components/ui/select"; // shadcn/ui Select
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // shadcn/ui Card
import { useToast } from "@/hooks/use-toast";
import {
  SelectContent,
  SelectGroup,
  SelectValue,
} from "@radix-ui/react-select";

const PermissionsPage = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Permission>>({
    name: "",
    parentId: null,
  });
  const { toast } = useToast();

  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = async () => {
    try {
      setLoading(true);
      const data = await fetchHierarchicalPermissions();
      console.log(data);
      setPermissions(data);
    } catch (err) {
      setError("Failed to load permissions.");
      console.log(err);
      toast({
        title: "Error",
        description: "Failed to load permissions.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "parentId" ? (value ? value : null) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      setError("Permission name is required.");
      toast({
        title: "Validation Error",
        description: "Permission name is required.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      if (form.id) {
        await updatePermissionLevel(form.id, {
          name: form.name!,
          parentId: form.parentId
            ? form.parentId !== "No Parent"
              ? form.parentId
              : null
            : null,
        });
        toast({
          title: "Success",
          description: "Permission updated successfully.",
          variant: "default",
        });
      } else {
        await addPermissionLevel({
          name: form.name!,
          parentId: form.parentId
            ? form.parentId !== "No Parent"
              ? form.parentId
              : null
            : null,
        });
        toast({
          title: "Success",
          description: "Permission added successfully.",
          variant: "default",
        });
      }
      setForm({ name: "", parentId: null });
      loadPermissions();
    } catch (err) {
      setError("Failed to save permission.");
      console.log(err);
      toast({
        title: "Error",
        description: "Failed to save permission.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this permission?")) {
      try {
        setLoading(true);
        await deletePermissionLevel(id);
        loadPermissions();
        toast({
          title: "Success",
          description: "Permission deleted successfully.",
          variant: "default",
        });
      } catch (err) {
        console.log(err);

        setError("Failed to delete permission.");
        toast({
          title: "Error",
          description: "Failed to delete permission.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const renderPermissions = (permissions: Permission[]) => {
    return permissions.map((perm) => (
      <li key={perm.id} className="ml-4 mt-2 list-disc">
        <div className="flex items-center gap-2">
          <span>{perm.name}</span>
          <Button variant="outline" size="sm" onClick={() => setForm(perm)}>
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(perm.id)}
          >
            Delete
          </Button>
        </div>
        {perm.children && perm.children.length > 0 && (
          <ul>{renderPermissions(perm.children)}</ul>
        )}
      </li>
    ));
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="shadow-md">
        <CardHeader>
          <h1 className="text-lg font-bold">Permissions</h1>
        </CardHeader>
        <CardContent>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="mb-4 flex gap-4 items-end">
            <Input
              type="text"
              name="name"
              placeholder="Permission Name"
              value={form.name || ""}
              onChange={handleFormChange}
              className="flex-1"
            />
            <div className="flex-1">
              <Select
                name="parentId"
                value={String(form.parentId || "")}
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    parentId: value ? value : null,
                  }))
                }
                // className="flex-1"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a parent permission">
                    {form.parentId
                      ? permissions.find((p) => p.id === form.parentId)?.name
                      : "No Parent"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="No Parent">No Parent</SelectItem>
                    {permissions.map((perm) => (
                      <SelectItem key={perm.id} value={String(perm.id)}>
                        {perm.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit">
              {form.id ? "Update" : "Add"} Permission
            </Button>
          </form>

          <ul>{renderPermissions(permissions)}</ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PermissionsPage;
