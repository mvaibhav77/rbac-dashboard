# Role Based Access Control (RBAC) Dashboard

A **Role Based Access Control (RBAC) Dashboard** built with **React**, providing a user-friendly interface to manage users, teams, and roles. This project enables administrators to add, edit, delete, and view users, assign roles with specific permissions, and associate users with teams.

---

## Features

- **User Management**:
  - Add new users with name, email, role, status, and team.
  - Edit existing users' details.
  - Delete users from the system.
- **Role-Based Access**:

  - Assign roles to users with predefined permissions.
  - Display role-specific permissions in the user table.

- **Team Management**:

  - Associate users with specific teams.
  - View team names alongside users in the table.

- **Dialogs for User Actions**:

  - Modal dialogs for adding and editing users.
  - Confirmation dialogs for deletion.

- **Dynamic Table Rendering**:
  - Displays user details in a clean, responsive table.
  - Hover effects and easy-to-use action buttons.

---

## Tech Stack

- **Frontend**: React (with functional components and hooks)
- **UI Components**:
  - Custom components for buttons, dialogs, and forms.
  - Utility-first CSS styling (e.g., TailwindCSS or custom CSS classes).
- **API**: Simulated via functions (`fetchUsers`, `fetchTeams`, `fetchRoles`, etc.).

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 18.x)
- **npm** or **pnpm**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mvaibhav77/rbac-dashboard.git
   cd rbac-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   npm dev
   ```

   or

   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## File Structure

```plaintext
src/
├── api/                # API simulation functions for users, teams, roles
├── components/         # Reusable UI components (e.g., Button, Dialog, UserForm)
├── lib/                # TypeScript types (e.g., User, Team, Role)
├── screens/            # Main pages (AllUsers.tsx)
├── App.tsx             # Entry point for the React app
├── index.tsx           # Application bootstrap
└── styles/             # Custom styles (if applicable)
```

---

## Usage

### 1. Add User

- Click the **Add User** button.
- Fill in the form with user details, including name, email, role, status, and team.
- Save the user to see them in the table.

### 2. Edit User

- Click the **Edit** button next to a user.
- Modify the desired details and save.

### 3. Delete User

- Click the **Delete** button next to a user.
- Confirm deletion in the popup dialog.

### 4. Role Management

- Assign roles to users from the dropdown menu.
- View role-specific permissions directly in the table.

---

## API Simulation

The application simulates backend calls using mock API functions. These functions can be found in the `src/api/` folder. Replace these with real API calls as needed.

- **Fetch Users**: `fetchUsers()`
- **Fetch Teams**: `fetchTeams()`
- **Fetch Roles**: `fetchRoles()`
- **Add User**: `addUser(user)`
- **Update User**: `updateUser(id, user)`
- **Delete User**: `deleteUser(id)`

---

## Future Enhancements

- Integrate with a real backend API.
- Add search and filter functionality for users.
- Support team and role creation/editing.
- Implement user authentication and authorization.
- Add pagination for large datasets.

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make changes and commit: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## Contact

For any questions or suggestions, feel free to reach out:

- **GitHub**: [mvaibhav77](https://github.com/mvaibhav77)
- **Email**: shukla.vaibhav1077@gmail.com

---
