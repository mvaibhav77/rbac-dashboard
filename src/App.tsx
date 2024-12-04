import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Users from "./Screens/Users";
import Roles from "./Screens/Roles";
import Permissions from "./Screens/Permissions";
import Home from "./Screens/Home";
import AllUsers from "./Screens/AllUsers";
import { Toaster } from "./components/ui/toaster";
function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Home />} />
          <Route path="/teams/:teamId/users" element={<Users />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/permissions" element={<Permissions />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
