import React, { useEffect, useState } from "react";
import {
  fetchRoles,
  fetchTeams,
  fetchPermissionLevels,
  addRole,
  updateRole,
  deleteRole,
} from "@/api/api";
import { Role, Team, Permission } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/MultiSelect";

const RolePage = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Role>>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rolesData, teamsData, permissionsData] = await Promise.all([
          fetchRoles(),
          fetchTeams(),
          fetchPermissionLevels(),
        ]);
        setRoles(rolesData);
        setTeams(teamsData);
        setPermissions(permissionsData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const filteredRoles = selectedTeamId
    ? roles.filter((role) => role.teamId === selectedTeamId)
    : roles;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: name === "teamId" ? Number(value) : value });
  };

  const handlePermissionChange = (values: string[]) => {
    setForm({ ...form, permissions: values });
  };

  const handleAddRole = async () => {
    if (!form.name || !form.teamId || !form.permissions?.length) return;
    try {
      const newRole = await addRole({
        name: form.name,
        teamId: form.teamId,
        permissions: form.permissions,
      });
      setRoles([...roles, newRole]);
      setForm({});
    } catch (error) {
      console.error("Error adding role", error);
    }
  };

  const handleEditRole = (role: Role) => {
    setForm({
      ...role,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      permissions: role.permissions.map((perm: any) => perm.id.toString()),
    });
    setIsEditing(true);
  };

  const handleUpdateRole = async () => {
    if (!form.id || !form.name || !form.teamId || !form.permissions?.length)
      return;
    try {
      const updatedRole = await updateRole(form.id, {
        name: form.name,
        teamId: form.teamId,
        permissions: form.permissions,
      });
      setRoles(roles.map((r) => (r.id === updatedRole.id ? updatedRole : r)));
      setForm({});
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating role", error);
    }
  };

  const handleDeleteRole = async (id: string) => {
    try {
      await deleteRole(id);
      setRoles(roles.filter((role) => role.id !== id));
    } catch (error) {
      console.error("Error deleting role", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Roles Management</h1>

      {/* Filter by Team */}
      <div className="mb-6">
        <label htmlFor="team-select" className="block text-sm font-medium mb-2">
          Filter by Team:
        </label>
        <Select onValueChange={(value) => setSelectedTeamId(Number(value))}>
          <SelectTrigger id="team-select">
            <SelectValue placeholder="All Teams">
              {selectedTeamId
                ? teams.find((team) => team.id === selectedTeamId)?.name
                : "All Teams"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-">All Teams</SelectItem>
            {teams.map((team) => (
              <SelectItem key={team.id} value={team.id.toString()}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Roles List */}
      <div className="bg-white p-4 rounded-md shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Roles</h2>
        <ul className="space-y-4">
          {filteredRoles.map((role) => (
            <li
              key={role.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div>
                <strong>{role.name}</strong> - Permissions:{" "}
                {(() => {
                  const rolePermissions =
                    role?.permissions
                      .map(
                        (permId) =>
                          permissions.find((perm) => perm.id === permId)?.name
                      )
                      .filter(Boolean) || [];

                  return rolePermissions.join(", ") || "No Permissions";
                })()}
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={() => handleEditRole(role)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteRole(role.id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Add/Edit Role Form */}
      <div className="bg-gray-100 p-4 rounded-md shadow">
        <h2 className="text-lg font-semibold mb-4">
          {isEditing ? "Edit Role" : "Add Role"}
        </h2>
        <Input
          type="text"
          name="name"
          placeholder="Role Name"
          value={form.name || ""}
          onChange={handleInputChange}
          className="mb-4"
        />
        <Select
          onValueChange={(value) => setForm({ ...form, teamId: Number(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Team">
              {form.teamId
                ? teams.find((team) => team.id === form.teamId)?.name
                : "Select Team"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Select Team">Select Team</SelectItem>
            {teams.map((team) => (
              <SelectItem key={team.id} value={team.id.toString()}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <MultiSelect
          options={permissions.map((permission) => ({
            label: permission.name,
            value: permission.id.toString(),
          }))}
          onValueChange={handlePermissionChange}
          defaultValue={form.permissions || []}
          placeholder="Select Permissions"
          className="mt-4 border border-gray-300 rounded-md"
        />

        <div className="flex items-center gap-4 mt-4">
          <Button onClick={isEditing ? handleUpdateRole : handleAddRole}>
            {isEditing ? "Update Role" : "Add Role"}
          </Button>
          {isEditing && (
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RolePage;
