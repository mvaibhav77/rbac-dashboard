// User Type
export interface User {
  id: number; // Unique identifier
  name: string; // User's full name
  email: string; // User's email address
  role: RoleName; // Role assigned to the user
  teamId: number | null; // Associated team (nullable for admin)
  status: "Active" | "Inactive"; // Status of the user
}

// Team Type
export interface Team {
  id: number; // Unique identifier
  name: string; // Team name (e.g., "Sales", "Development")
  description: string; // Description of the team's purpose
}

// Permission Type
export interface Permission {
  id: number; // Unique identifier
  name: "read" | "write" | "delete"; // Permission name
}

// Role Type
export interface Role {
  id: number; // Unique identifier
  name: RoleName; // Role name
}

// Role Name Type
export type RoleName = "admin" | "manager" | "team_member"; // Enum-like type for roles

// Role-Permission Mapping Type
export interface RolePermission {
  id?: number; // Unique identifier (optional for client-side creation)
  roleId: number; // ID of the role
  permissionId: number; // ID of the permission
}

// User-Team Mapping Type
export interface UserTeam {
  id?: number; // Unique identifier (optional for client-side creation)
  userId: number; // ID of the user
  teamId: number; // ID of the team
}
