// User Type
export interface User {
  id: number; // Unique identifier
  name: string; // User's full name
  email: string; // User's email address
  roleId: string; // ID of the role assigned to the user
  teamId: number | null; // ID of the associated team (nullable for admin)
  status: "Active" | "Inactive"; // Status of the user (active or inactive)
}

// Team Type
export interface Team {
  id: number; // Unique identifier
  name: string; // Team name (e.g., "Sales", "Development")
  description: string; // Description of the team's purpose
}

// Permission Type// Permission Type
export type Permission = {
  id: string; // Unique identifier for the permission
  name: string; // Name of the permission level
  parentId: string | null; // Parent permission ID (null for root-level permissions)
  children?: Permission[]; // Array of child permissions (used for hierarchy)
};

// Role Type
export interface Role {
  id: string; // Unique identifier for the role
  name: string; // Name of the role (e.g., "admin", "manager", "team_member")
  teamId: number | null; // ID of the associated team (nullable for admin)
  permissions: string[]; // ID of the permission level associated with this role
}

// Role-Permission Mapping Type
export interface RolePermission {
  id?: string; // Unique identifier for the mapping (optional for client-side creation)
  roleId: string; // ID of the role
  permissionId: string; // ID of the permission level
}

// User-Team Mapping Type
export interface UserTeam {
  id?: string; // Unique identifier for the mapping (optional for client-side creation)
  userId: number; // ID of the user
  teamId: number; // ID of the team
}
