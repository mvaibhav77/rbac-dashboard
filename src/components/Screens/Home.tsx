import { fetchTeams } from "@/api/api";
import { Team } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTeams = async () => {
      const data = await fetchTeams();
      setTeams(data);
    };

    loadTeams();
  }, []);

  const handleTeamClick = (teamId: number) => {
    navigate(`/teams/${teamId}/users`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Teams</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div
            key={team.id}
            className="p-4 bg-white shadow-md rounded cursor-pointer hover:bg-gray-100"
            onClick={() => handleTeamClick(team.id)}
          >
            <h2 className="text-lg font-bold">{team.name}</h2>
            <p className="text-gray-600">{team.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
