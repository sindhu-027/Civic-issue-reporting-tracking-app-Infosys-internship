import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FaUsers,
  FaUserTie,
  FaExclamationCircle,
  FaCheckCircle,
  FaTrash,
  FaEdit,
  FaUserCircle,
} from "react-icons/fa";
import api from "../api/axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // ----------------- Navbar states -----------------
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;
  // ----------------- Tab & Data states -----------------
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    volunteers: 0,
    complaints: 0,
    resolved: 0,
  });
  const [monthlyStats, setMonthlyStats] = useState({
    complaints: {},
    userGrowth: {},
    userVsVolunteer: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, complaintRes, statsRes, monthlyRes] = await Promise.all([
          api.get("/auth/all"),
          api.get("/complaints/all"),
          api.get("/complaints/admin-overview"),
          api.get("/complaints/monthly-stats"),
        ]);

        setUsers(userRes.data || []);
        setComplaints(complaintRes.data || []);
        setStats({
          totalUsers: statsRes.data.totalUsers || 0,
          volunteers: statsRes.data.volunteers || 0,
          complaints: statsRes.data.totalComplaints || 0,
          resolved: statsRes.data.resolved || 0,
        });

        setMonthlyStats(
          monthlyRes.data || { complaints: {}, userGrowth: {}, userVsVolunteer: {} }
        );

        
      // Fetch **current logged-in user**
      const currentUserRes = await api.get("/auth/profile"); // backend route to get logged-in user
      setUser(currentUserRes.data || null);

      } catch (err) {
        console.error("Error fetching admin data:", err);
      }
    };

    fetchData();
  }, []);

  // ----------------- Render -----------------
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Navbar */}
      <header className="flex flex-col md:flex-row justify-between items-center px-6 py-4 shadow-md bg-gray-50">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <img src="/logo.png" alt="logo" className="w-6 h-6" />
          <span className="font-bold text-xl">CleanStreet</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-8 text-gray-700 mb-2 md:mb-0">
          <Link
            to="/admin-dashboard"
            className={`hover:underline font-medium ${
              isActive("/admin-dashboard") ? "text-blue-600 font-bold" : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/report"
            className={`hover:underline font-medium ${
              isActive("/report") ? "text-blue-600 font-bold" : ""
            }`}
          >
            Report Issue
          </Link>
          <Link
            to="/complaints"
            className={`hover:underline font-medium ${
              isActive("/complaints") ? "text-blue-600 font-bold" : ""
            }`}
          >
            View Complaints
          </Link>
          <Link
            to="/admin-logs"
            className={`hover:underline font-medium ${
              isActive("/admin-logs") ? "text-blue-600 font-bold" : ""
            }`}
          >
            Admin Logs
          </Link>
        </nav>

        {/* User Profile + Logout */}
        <div className="flex items-center space-x-4">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="w-8 h-8" />
            )}
            <span className="font-medium">{user?.username || "Admin"}</span>
              
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-1 rounded-full bg-blue-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="mx-6 mt-2">
        <div
          className="w-full h-40 rounded-2xl bg-cover bg-center flex items-center px-6 text-white"
          style={{ backgroundImage: "url('/dashboard-bg.png')" }}
        >
          <div>
            <h2 className="text-2xl font-semibold">Keep Our City Clean Together</h2>
            <p className="text-sm mt-1">
              Report issues, track progress, and help maintain our community
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-b border-gray-200 mt-2">
        {["overview", "manageUsers", "viewComplaints"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === tab
                ? "border-b-4 border-green-600 text-green-600"
                : "text-gray-500 hover:text-green-600"
            }`}
          >
            {tab === "overview"
              ? "Overview"
              : tab === "manageUsers"
              ? "Manage Users"
              : "View Complaints"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "overview" && (
          <OverviewSection
            stats={stats}
            complaints={complaints}
            monthlyStats={monthlyStats}
          />
        )}
        {activeTab === "manageUsers" && (
          <ManageUsers users={users} setUsers={setUsers} />
        )}
        {activeTab === "viewComplaints" && (
          <ViewComplaints complaints={complaints} />
        )}
      </div>
    </div>
  );
}
/* -----------------------------------
   OVERVIEW SECTION
------------------------------------*/
function OverviewSection({ stats, complaints, monthlyStats }) {
  const statusDistribution = complaints.reduce((acc, c) => {
    const status = c.status?.toLowerCase() || "unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const userVsVolunteer = monthlyStats.userVsVolunteer || {};
  const complaintTrend = monthlyStats.complaints || {};

  const handleGeneratePDF = () => {
    window.open("/api/complaints/monthly-report", "_blank");
  };

  const uvLabels = Object.keys(userVsVolunteer);
  const uvUserData = uvLabels.map((m) => userVsVolunteer[m].users || 0);
  const uvVolunteerData = uvLabels.map((m) => userVsVolunteer[m].volunteers || 0);

  const trendLabels = Object.keys(complaintTrend);
  const trendData = trendLabels.map((m) => complaintTrend[m] || 0);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard icon={<FaUsers />} iconColor="text-green-500" title="Total Users" value={stats.totalUsers} />
        <StatCard icon={<FaUserTie />} iconColor="text-yellow-500" title="Volunteers" value={stats.volunteers} />
        <StatCard icon={<FaExclamationCircle />} iconColor="text-red-500" title="Complaints" value={stats.complaints} />
        <StatCard icon={<FaCheckCircle />} iconColor="text-blue-500" title="Resolved" value={stats.resolved} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ChartCard title="User vs Volunteer (Monthly)">
          <div className="h-64 w-full">
            <Bar
              data={{
                labels: uvLabels,
                datasets: [
                  { label: "Users", data: uvUserData, backgroundColor: "#2563eb" },
                  { label: "Volunteers", data: uvVolunteerData, backgroundColor: "#16a34a" },
                ],
              }}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </ChartCard>

        <ChartCard title="Complaint Status Distribution">
          <div className="h-64 w-full">
            <Pie
              data={{
                labels: Object.keys(statusDistribution),
                datasets: [{ data: Object.values(statusDistribution), backgroundColor: ["#ef4444", "#22c55e", "#3b82f6", "#eab308"] }],
              }}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </ChartCard>
      </div>

      <div className="mt-8">
        <ChartCard title="Monthly Complaint Trend">
          <div className="flex justify-end mb-2">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleGeneratePDF}
            >
              Generate Report (PDF)
            </button>
          </div>
          <div className="h-64 w-full">
            <Line
              data={{
                labels: trendLabels,
                datasets: [
                  {
                    label: "Complaints",
                    data: trendData,
                    borderColor: "#3b82f6",
                    backgroundColor: "rgba(59,130,246,0.2)",
                    tension: 0.3,
                  },
                ],
              }}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
/* -----------------------------------
   MANAGE USERS
------------------------------------*/
function ManageUsers({ users, setUsers }) {
  const [filterLocation, setFilterLocation] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [searchLocation, setSearchLocation] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [editedRole, setEditedRole] = useState("");

  const locations = Array.from(new Set(users.map((u) => u.address).filter(Boolean)));

  const filteredUsers = users.filter((u) => {
    const matchesLocation = filterLocation === "all" || u.address === filterLocation;
    const matchesRole = filterRole === "all" || u.role === filterRole;
    const matchesSearch = !searchLocation || u.address?.toLowerCase().includes(searchLocation.toLowerCase());
    return matchesLocation && matchesRole && matchesSearch;
  });

  const handleSaveRole = async (userId) => {
    try {
      const response = await api.put("/complaints/updateRole", { userId, role: editedRole });
      setUsers(users.map((u) => (u._id === userId ? { ...u, role: editedRole } : u)));
      setEditUserId(null);
      alert(response.data.message || "Role updated successfully!");
    } catch (err) {
      console.error("Error updating role:", err);
      alert(err.response?.data?.message || "Failed to update role");
    }
  };

  const roleColors = { admin: "bg-red-100 text-red-700", volunteer: "bg-blue-100 text-blue-700", user: "bg-green-100 text-green-700" };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Manage Users</h2>
      {/* Filters */}
      <div className="bg-white p-5 rounded-2xl shadow-lg flex flex-col md:flex-row gap-6 mb-6 items-center">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 flex-1">
          <label className="font-medium text-gray-700">Filter by Location:</label>
          <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="all">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 flex-1">
          <label className="font-medium text-gray-700">Filter by Role:</label>
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="volunteer">Volunteer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex flex-1 items-center gap-3 w-full md:w-auto">
          <label className="font-medium text-gray-700 whitespace-nowrap">Search Location:</label>
          <input type="text" placeholder="Type location..." value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
        <table className="min-w-full text-sm text-left border-separate border-spacing-0">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Joined</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
            {filteredUsers.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50 transition duration-150">
                <td className="px-6 py-4 font-medium text-gray-800">{u.username}</td>
                <td className="px-6 py-4 text-gray-600">{u.email}</td>
                <td className="px-6 py-4">
                  {editUserId === u._id ? (
                    <select value={editedRole} onChange={(e) => setEditedRole(e.target.value)} className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="user">User</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${roleColors[u.role]}`}>{u.role}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-600">{u.address || "N/A"}</td>
                <td className="px-6 py-4 text-gray-600">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 flex gap-4">
                  {editUserId === u._id ? (
                    <>
                      <button onClick={() => handleSaveRole(u._id)} className="text-green-600 hover:underline transition">Save</button>
                      <button onClick={() => setEditUserId(null)} className="text-gray-600 hover:underline transition">Cancel</button>
                    </>
                  ) : (
                    <FaEdit className="text-blue-500 cursor-pointer hover:text-blue-700 transition" onClick={() => { setEditUserId(u._id); setEditedRole(u.role); }} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//   VIEW COMPLAINTS

function ViewComplaints({ complaints }) {
  const [complaintList, setComplaintList] = useState(complaints);
  const [nearbyVolunteers, setNearbyVolunteers] = useState({}); // { complaintId: [volunteers] }

  // Status badge colors
  const getStatusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-xs font-semibold capitalize shadow-sm border";
    switch (status?.toLowerCase()) {
      case "pending": return `${base} bg-red-100 text-red-600 border-red-200`;
      case "in progress": return `${base} bg-yellow-100 text-yellow-600 border-yellow-200`;
      case "resolved": return `${base} bg-green-100 text-green-600 border-green-200`;
      case "assigned": return `${base} bg-blue-100 text-blue-600 border-blue-200`;
      default: return `${base} bg-gray-100 text-gray-600 border-gray-200`;
    }
  };

  // Text color for select
  const getTextColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "text-red-600";
      case "in progress": return "text-yellow-600";
      case "resolved": return "text-green-600";
      case "assigned": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  // Update status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/complaints/update-status/${id}`, { status: newStatus });
      setComplaintList(prev =>
        prev.map(c => (c._id === id ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      console.error("Error updating complaint status:", err);
      alert("Failed to update status.");
    }
  };

  // Delete complaint
  const handleDeleteComplaint = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;
    try {
      await api.delete(`/complaints/${id}`);
      setComplaintList(prev => prev.filter(c => c._id !== id));
      alert("Complaint deleted successfully!");
    } catch (err) {
      console.error("Error deleting complaint:", err);
      alert("Failed to delete complaint.");
    }
  };

  // Fetch nearby volunteers
  const fetchNearbyVolunteers = async (complaintId) => {
    try {
      const res = await api.get(`/complaints/${complaintId}/nearby-volunteers`);
      setNearbyVolunteers(prev => ({ ...prev, [complaintId]: res.data }));
    } catch (err) {
      console.error("Error fetching nearby volunteers:", err);
      alert("Failed to fetch nearby volunteers.");
    }
  };

  // Assign volunteer
  const handleAssignVolunteer = async (complaintId, volunteerId) => {
    try {
      const res = await api.put(`/complaints/${complaintId}/assign`, { volunteerId });
      const updatedComplaint = res.data.complaint;

      // Update complaint list with assigned volunteer
      setComplaintList(prev =>
        prev.map(c => (c._id === complaintId ? updatedComplaint : c))
      );

      // Remove volunteer dropdown
      setNearbyVolunteers(prev => ({ ...prev, [complaintId]: [] }));

      alert("Volunteer assigned successfully!");
    } catch (err) {
      console.error("Error assigning volunteer:", err);
      alert("Failed to assign volunteer.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">View Complaints</h2>
      <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-5 py-3">Complaint ID</th>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Volunteer</th>
              <th className="px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaintList.map(c => (
              <tr key={c._id} className="bg-white rounded-xl shadow-md my-4 hover:shadow-xl transition-all duration-200">
                <td className="px-5 py-4 font-medium text-gray-800">{c._id}</td>
                <td className="px-5 py-4 font-medium text-gray-700">{c.title}</td>
                <td className="px-5 py-4 text-gray-600">{c.user?.username || "N/A"}</td>
                <td className="px-5 py-4">
                  <span className={getStatusBadge(c.status)}>{c.status || "Unknown"}</span>
                </td>

                {/* Volunteer column */}
                <td className="px-5 py-4 text-gray-600">
                  {c.volunteer?.username || "Unassigned"}

                  {!c.volunteer && (
                    <div className="mt-2">
                      <button
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition"
                        onClick={() => fetchNearbyVolunteers(c._id)}
                      >
                        Assign
                      </button>

                      {nearbyVolunteers[c._id]?.length > 0 && (
                        <select
                          onChange={e => handleAssignVolunteer(c._id, e.target.value)}
                          defaultValue=""
                          className="border border-gray-300 rounded-lg px-2 py-1 mt-1 text-sm w-full"
                        >
                          <option value="" disabled>Select Volunteer</option>
                          {nearbyVolunteers[c._id].map(v => (
                            <option key={v._id} value={v._id}>
                              {v.username} ({v.distance} km)
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  )}
                </td>

                {/* Actions column */}
                <td className="px-5 py-4 flex justify-center items-center gap-3">
                  <select
                    value={c.status}
                    onChange={e => handleStatusChange(c._id, e.target.value)}
                    className={`border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 ${getTextColor(c.status)}`}
                  >
                    <option value="Pending" className="text-red-600">Pending</option>
                    <option value="In Progress" className="text-yellow-600">In Progress</option>
                    <option value="Assigned" className="text-blue-600">Assigned</option>
                    <option value="Resolved" className="text-green-600">Resolved</option>
                  </select>
                  <FaTrash
                    className="text-red-500 cursor-pointer hover:text-red-700 transition"
                    onClick={() => handleDeleteComplaint(c._id)}
                  />
                </td>
              </tr>
            ))}

            {complaintList.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* -----------------------------------
   COMPONENTS
------------------------------------*/
function StatCard({ icon, title, value, iconColor }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4">
      <div className={`text-3xl ${iconColor}`}>{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="font-semibold text-gray-800 mb-4">{title}</h3>
      {children}
    </div>
  );
}
