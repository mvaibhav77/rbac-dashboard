import React, { useEffect, useState } from "react";
import {
  deleteUser,
  fetchUsers,
  fetchTeams,
  fetchRoles,
  addUser,
  updateUser,
  fetchPermissionLevels,
} from "@/api/api";
import { User, Team, Role, Permission } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UserForm from "@/components/UserForm";

const AllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const [userData, teamData, roleData, permissionsData] = await Promise.all(
        [fetchUsers(), fetchTeams(), fetchRoles(), fetchPermissionLevels()]
      );
      setUsers(userData);
      setTeams(teamData);
      setRoles(roleData);
      setPermissions(permissionsData);
    };
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleSaveUser = async (user: Partial<User>, isEdit: boolean) => {
    if (isEdit && user.id) {
      const updatedUser = await updateUser(user.id, user);
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, ...updatedUser } : u))
      );
    } else {
      const newUser = await addUser({
        name: user.name!,
        email: user.email!,
        roleId: user.roleId!,
        status: user.status!,
        teamId: user.teamId!,
      });
      setUsers((prev) => [...prev, newUser]);
    }
    setAddDialogOpen(false);
    setEditDialogOpen(false);
  };

  const renderTable = () => (
    <table className="min-w-full bg-white shadow-md rounded">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-4 text-left">Name</th>
          <th className="py-2 px-4 text-left">Email</th>
          <th className="py-2 px-4 text-left">Role</th>
          <th className="py-2 px-4 text-left">Permissions</th>
          <th className="py-2 px-4 text-left">Status</th>
          <th className="py-2 px-4 text-left">Team</th>
          <th className="py-2 px-4 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          const role = roles.find((role) => role.id === user.roleId);
          const rolePermissions =
            role?.permissions
              .map(
                (permId) => permissions.find((perm) => perm.id === permId)?.name
              )
              .filter(Boolean) || [];
          return (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{role?.name || "N/A"}</td>
              <td className="py-2 px-4">
                {rolePermissions.length > 0
                  ? rolePermissions.join(", ")
                  : "No Permissions"}
              </td>
              <td className="py-2 px-4">{user.status}</td>
              <td className="py-2 px-4">
                {teams.find((team) => team.id === user.teamId)?.name || "N/A"}
              </td>
              <td className="py-2 px-4 text-center">
                <button
                  className="text-blue-500 hover:underline mr-2"
                  onClick={() => {
                    setSelectedUser(user);
                    setEditDialogOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <div className="mb-4">
        <Button onClick={() => setAddDialogOpen(true)}>Add User</Button>
      </div>
      {renderTable()}

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <UserForm
            onSave={(user) => handleSaveUser(user, false)}
            teams={teams}
            roles={roles}
            onCancel={() => setAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <UserForm
              onSave={(user) => handleSaveUser(user, true)}
              teams={teams}
              roles={roles}
              user={selectedUser}
              onCancel={() => setEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllUsers;
