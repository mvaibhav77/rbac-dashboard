import React, { useState } from "react";
import { User, Team, Role } from "@/lib/types";
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
  roles: Role[];
  currentTeamId?: number;
  user?: User;
}

const UserForm: React.FC<UserFormProps> = ({
  onSave,
  onCancel,
  teams,
  roles,
  currentTeamId,
  user,
}) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [roleId, setRoleId] = useState<string>(user?.roleId ? String(user.roleId) : String(roles[0]?.id) || "0");
  const [status, setStatus] = useState(user?.status || "Active");
  const [teamId, setTeamId] = useState(user?.teamId || currentTeamId || null);

  const handleSubmit = () => {
    onSave({ id: user?.id, name, email, roleId, status, teamId });
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
        value={String(roleId)}
        onValueChange={(value) => setRoleId(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a role">
            {roles.find((role) => role.id === roleId)?.name || "Select Role"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Set Role</SelectLabel>
            {roles.map((role) => (
              <SelectItem key={role.id} value={String(role.id)}>
                {role.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={status}
        onValueChange={(value: "Active" | "Inactive") => setStatus(value)}
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
        disabled={currentTeamId === null}
        value={teamId !== null ? String(teamId) : "null"}
        onValueChange={(value: string) =>
          setTeamId(value === "null" ? null : Number(value))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a team">
            {teamId !== null
              ? teams.find((team) => team.id === teamId)?.name
              : "No Team"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Set Team</SelectLabel>
            <SelectItem value="null">No Team</SelectItem>
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
