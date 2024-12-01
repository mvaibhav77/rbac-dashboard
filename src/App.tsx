import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Users from "./components/Screens/Users";
import Roles from "./components/Screens/Roles";
import Permissions from "./components/Screens/Permissions";
import Home from "./components/Screens/Home";
import AllUsers from "./components/Screens/AllUsers";
function App() {
  return (
    <Router>
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
