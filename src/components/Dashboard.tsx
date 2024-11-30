import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <main className="flex h-screen">
      {/* sidebar */}
      <Sidebar />

      {/* outlet */}
      <div className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </div>
    </main>
  );
};

export default Dashboard;
