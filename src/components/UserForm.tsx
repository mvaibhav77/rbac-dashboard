import React, { useState } from "react";
import { User, Team } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";

interface UserFormProps {
  onSave: (user: Partial<User>) => void;
  onCancel: () => void;
  teams: Team[];
  user?: User;
}

const UserForm: React.FC<UserFormProps> = ({
  onSave,
  onCancel,
  teams,
  user,
}) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "team_member");
  const [status, setStatus] = useState(user?.status || "Active");
  const [teamId, setTeamId] = useState(user?.teamId || null);

  console.log(email, role, status, teamId);

  const handleSubmit = () => {
    onSave({ id: user?.id, name, email, role, status, teamId });
  };

  return (
    <div className="space-y-4">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Select
        value={role}
        onValueChange={(e: "manager" | "team_member") => setRole(e)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a role">
            {role === "team_member" ? "Team Member" : "Manager"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Set Role</SelectLabel>
            <SelectItem value="team_member">Team Member</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={status}
        onValueChange={(e: "Active" | "Inactive") => setStatus(e)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a status">{status}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Set Status</SelectLabel>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        disabled={role === "admin"}
        value={teams.find((team) => team.id == teamId)?.name}
        onValueChange={(e: string | null) => setTeamId(Number(e))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a team">
            {/* convert teamId to team name */}
            {teams.find((team) => team.id == teamId)?.name}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Set Team</SelectLabel>
            <SelectItem value={"ONLY ADMIN"}>No Team</SelectItem>
            {teams.map((team) => (
              <SelectItem key={team.id} value={String(team.id)}>
                {team.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex justify-end space-x-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
};

export default UserForm;
