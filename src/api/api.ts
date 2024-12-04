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
  const response = await api.get(`/users?teamId=${teamId}`);
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

export const addRole = async (role: Partial<Role>) => {
  try {
    const response = await api.post("/roles", role);
    return response.data;
  } catch (error) {
    console.error("Error adding role", error);
    throw error;
  }
};

export const updateRole = async (id: string, role: Partial<Role>) => {
  try {
    const response = await api.put(`/roles/${id}`, role);
    return response.data;
  } catch (error) {
    console.error("Error updating role", error);
    throw error;
  }
};

export const deleteRole = async (id: string): Promise<void> => {
  await api.delete(`/roles/${id}`);
};

// Permissions API
export const fetchPermissionLevels = async (): Promise<Permission[]> => {
  const response = await api.get("/permissionLevels");
  return response.data;
};

export const addPermissionLevel = async (
  permission: Omit<Permission, "id">
): Promise<Permission> => {
  const response = await api.post("/permissionLevels", permission);
  return response.data;
};

export const updatePermissionLevel = async (
  id: string,
  permission: Partial<Omit<Permission, "id">>
): Promise<Permission> => {
  const response = await api.put(`/permissionLevels/${id}`, permission);
  return response.data;
};

export const deletePermissionLevel = async (id: string): Promise<void> => {
  await api.delete(`/permissionLevels/${id}`);
};

export const fetchHierarchicalPermissions = async (): Promise<Permission[]> => {
  const permissions = await fetchPermissionLevels();

  console.log(permissions);

  // Create a map for quick access by ID
  const map = new Map<string, Permission>();

  // Initialize all permissions in the map with empty children arrays
  permissions.forEach((perm) => {
    map.set(perm.id, { ...perm, children: [] });
  });

  // Root-level permissions
  const root: Permission[] = [];

  // Populate the hierarchy
  permissions.forEach((perm) => {
    if (perm.parentId) {
      const parent = map.get(perm.parentId);
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(map.get(perm.id)!); // Add the child to the parent's children array
      } else {
        console.warn(
          `Parent with ID ${perm.parentId} not found for permission ${perm.id}`
        );
      }
    } else {
      root.push(map.get(perm.id)!); // Add root-level permissions directly
    }
  });

  return root;
};

// Fetch role-permission assignments
export const fetchRolePermissions = async (): Promise<RolePermission[]> => {
  const response = await api.get("/rolePermissions");
  return response.data;
};

// Assign permissions to a role
export const assignPermissionsToRole = async (
  roleId: number,
  permissionLevelIds: string[]
): Promise<void> => {
  await api.post(`/roles/${roleId}/permissions`, { permissionLevelIds });
};

// Remove a permission from a role
export const removePermissionFromRole = async (
  roleId: number,
  permissionLevelId: string
): Promise<void> => {
  await api.delete(`/roles/${roleId}/permissions/${permissionLevelId}`);
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
