import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteUser,
  fetchTeamById,
  fetchUsersByTeam,
  updateUser,
} from "@/api/api";
import { Team, User } from "@/lib/types";
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
  const [managers, setManagers] = useState<User[]>([]);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      const allUsers = await fetchUsersByTeam(Number(teamId));
      const _team = await fetchTeamById(Number(teamId));
      setTeam(_team);
      setManagers(allUsers.filter((user) => user.role === "manager"));
      setTeamMembers(allUsers.filter((user) => user.role === "team_member"));
    };

    if (teamId) {
      loadUsers();
    }
  }, [teamId]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      setManagers(managers.filter((user) => user.id !== id));
      setTeamMembers(teamMembers.filter((user) => user.id !== id));
    }
  };

  const handleEdit = (user: User) => {
    setIsEditDialogOpen(true);
    setEditUser(user);
  };

  const handleEditSave = async (updatedUser: Partial<User>) => {
    if (!updatedUser.id) return;
    await updateUser(updatedUser.id, updatedUser as User);

    if (updatedUser.role === "manager") {
      setManagers((prev) =>
        prev.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        )
      );
    } else {
      setTeamMembers((prev) =>
        prev.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        )
      );
    }

    setEditUser(null);
  };

  const renderTable = (users: User[], title: string) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.status}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users in Team {team.name}</h1>
      {renderTable(managers, "Managers")}
      {renderTable(teamMembers, "Team Members")}

      {editUser && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            {editUser && (
              <UserForm
                onSave={(user) => handleEditSave(user)}
                teams={[team]}
                user={editUser}
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
