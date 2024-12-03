import axios from "axios";
import {
  User,
  Team,
  Role,
  Permission,
  RolePermission,
  UserTeam,
} from "@/lib/types";

const API_BASE_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Users API
export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data;
};

// Fetch users by team
export const fetchUsersByTeam = async (teamId: number): Promise<User[]> => {
  const response = await axios.get(`${API_BASE_URL}/users?teamId=${teamId}`);
  return response.data;
};

export const addUser = async (user: Omit<User, "id">): Promise<User> => {
  const response = await api.post("/users", user);
  return response.data;
};

export const updateUser = async (
  id: number,
  user: Partial<Omit<User, "id">>
): Promise<User> => {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

// Teams API
export const fetchTeams = async (): Promise<Team[]> => {
  const response = await api.get("/teams");
  return response.data;
};

// Fetch team by ID
export const fetchTeamById = async (id: number): Promise<Team> => {
  const response = await api.get(`/teams/${id}`);
  return response.data;
};

export const addTeam = async (team: Omit<Team, "id">): Promise<Team> => {
  const response = await api.post("/teams", team);
  return response.data;
};

export const updateTeam = async (
  id: number,
  team: Partial<Omit<Team, "id">>
): Promise<Team> => {
  const response = await api.put(`/teams/${id}`, team);
  return response.data;
};

export const deleteTeam = async (id: number): Promise<void> => {
  await api.delete(`/teams/${id}`);
};

// Roles API
export const fetchRoles = async (): Promise<Role[]> => {
  const response = await api.get("/roles");
  return response.data;
};

export const addRole = async (role: Omit<Role, "id">): Promise<Role> => {
  const response = await axios.post(`${API_BASE_URL}/roles`, role);
  return response.data;
};

export const updateRole = async (id: number, role: Role): Promise<Role> => {
  const response = await axios.put(`${API_BASE_URL}/roles/${id}`, role);
  return response.data;
};

export const deleteRole = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/roles/${id}`);
};

// Permissions API
export const fetchPermissions = async (): Promise<Permission[]> => {
  const response = await api.get("/permissions");
  return response.data;
};
export const addPermission = async (
  permission: Omit<Permission, "id">
): Promise<Permission> => {
  const response = await axios.post(`${API_BASE_URL}/permissions`, permission);
  return response.data;
};

export const updatePermission = async (
  id: number,
  permission: Permission
): Promise<Permission> => {
  const response = await axios.put(
    `${API_BASE_URL}/permissions/${id}`,
    permission
  );
  return response.data;
};

export const deletePermission = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/permissions/${id}`);
};

// Role-Permission Mapping API
export const fetchRolePermissions = async (): Promise<RolePermission[]> => {
  const response = await api.get("/rolePermissions");
  return response.data;
};

export const addRolePermission = async (
  mapping: Omit<RolePermission, "id">
): Promise<RolePermission> => {
  const response = await api.post("/rolePermissions", mapping);
  return response.data;
};

export const deleteRolePermission = async (id: number): Promise<void> => {
  await api.delete(`/rolePermissions/${id}`);
};

// User-Team Mapping API
export const fetchUserTeams = async (): Promise<UserTeam[]> => {
  const response = await api.get("/userTeams");
  return response.data;
};

export const addUserTeam = async (
  mapping: Omit<UserTeam, "id">
): Promise<UserTeam> => {
  const response = await api.post("/userTeams", mapping);
  return response.data;
};

export const deleteUserTeam = async (id: number): Promise<void> => {
  await api.delete(`/userTeams/${id}`);
};
