import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteUser,
  fetchTeamById,
  fetchUsersByTeam,
  updateUser,
  fetchRoles,
  fetchPermissionLevels,
} from "@/api/api";
import { Team, User, Role, Permission } from "@/lib/types";
import UserForm from "@/components/UserForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Users: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [team, setTeam] = useState<Team>({ id: 0, name: "", description: "" });
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [_team, usersData, rolesData, permissionsData] =
          await Promise.all([
            fetchTeamById(Number(teamId)),
            fetchUsersByTeam(Number(teamId)),
            fetchRoles(),
            fetchPermissionLevels(),
          ]);

        setTeam(_team);
        setUsers(usersData);
        setRoles(rolesData);
        setPermissions(permissionsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (teamId) {
      fetchData();
    }
  }, [teamId]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleEdit = (user: User) => {
    setIsEditDialogOpen(true);
    setEditUser(user);
  };

  const handleEditSave = async (updatedUser: Partial<User>) => {
    if (!updatedUser.id) return;
    try {
      await updateUser(updatedUser.id, updatedUser as User);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        )
      );
      setEditUser(null);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const renderTable = (users: User[], title: string) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Role</th>
            <th className="py-2 px-4 text-left">Permissions</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const userRole = roles.find((role) => role.id === user.roleId);
            const rolePermissions =
              userRole?.permissions
                .map(
                  (permId) =>
                    permissions.find((perm) => perm.id === permId)?.name
                )
                .filter(Boolean) || []; // Remove undefined values

            return (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{userRole?.name || "N/A"}</td>
                <td className="py-2 px-4">{rolePermissions.join(", ")}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    className="text-red-500 hover:underline mr-2"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users in Team {team.name}</h1>
      {renderTable(users, "Team Members")}

      {editUser && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            {editUser && (
              <UserForm
                user={editUser}
                teams={[team]}
                roles={roles}
                onSave={handleEditSave}
                onCancel={() => setIsEditDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Users;
