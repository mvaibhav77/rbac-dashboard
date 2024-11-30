import { deleteUser, fetchTeamById, fetchUsersByTeam } from "@/api/api";
import { Team, User } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Users: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [team, setTeam] = useState<Team>({ id: 0, name: "", description: "" });
  const [managers, setManagers] = useState<User[]>([]);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);

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
                <button className="text-blue-500 hover:underline">Edit</button>
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
    </div>
  );
};

export default Users;
