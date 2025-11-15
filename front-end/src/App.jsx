import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ReportIssue from "./components/ReportIssue";
import Profile from "./components/Profile";
import ViewComplaints from "./components/ViewComplaints";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogs from "./components/AdminLogs";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/complaints" element={<ViewComplaints />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-logs" element={<AdminLogs />} />

      </Routes>
    </Router>
  );
}


