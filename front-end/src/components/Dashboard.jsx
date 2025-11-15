import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  RefreshCcw,
  UserCircle,
  XCircle,
  FileText,
} from "lucide-react";
import "jspdf-autotable";
import { io } from "socket.io-client";
import api from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    inProgress: 0,
  });
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);
  const [nearbyComplaints, setNearbyComplaints] = useState([]);
  const [viewingComplaint, setViewingComplaint] = useState(null);

  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

  //  Socket.io
  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => console.log("🟢 Connected to socket server"));
    socket.on("complaintUpdated", fetchDashboardData);
    socket.on("newComplaint", fetchDashboardData);
    socket.on("complaintDeleted", fetchDashboardData);
    socket.on("disconnect", () => console.log("🔴 Socket disconnected"));

    return () => socket.disconnect();
  }, []);

  //  Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/auth/profile");
        setUser(data);

        //  Redirect admin to AdminDashboard
        if (data.role === "admin") {
          navigate("/admin-dashboard");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  //  Fetch dashboard data
  const fetchDashboardData = async () => {
    if (!user) return;
    try {
      const { data: dataStats } = await api.get("/complaints/stats");
      setStats({
        total: dataStats.total || 0,
        pending: dataStats.pending || 0,
        resolved: dataStats.resolved || 0,
        inProgress: dataStats.inProgress || 0,
      });

      if (user.role === "volunteer") {
        const { data: assigned } = await api.get("/complaints/assigned");
        setActivities(assigned);

        let lat = user.lat;
        let lng = user.lng;
        if (!lat || !lng) {
          await new Promise((resolve) =>
            navigator.geolocation.getCurrentPosition((pos) => {
              lat = pos.coords.latitude;
              lng = pos.coords.longitude;
              resolve();
            })
          );
        }
        const { data: nearby } = await api.get(
          `/complaints/nearby?latitude=${lat}&longitude=${lng}`
        );
        setNearbyComplaints(nearby || []);
      } else {
        const { data } = await api.get("/complaints/my");
        setActivities(data || []);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  useEffect(() => {
    if (user) fetchDashboardData();
  }, [user]);

  //  Logout
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      sessionStorage.clear();
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  //  Volunteer Actions
  const handleVolunteerAction = async (id, status) => {
    try {
  //    await api.put(`/complaints/${id}/status`, { status });
      await api.put(`/complaints/update-status/${id}`, { status });

      setViewingComplaint(null);
      fetchDashboardData();
    } catch (err) {
      console.error("Volunteer action error:", err);
      alert(err.response?.data?.message || "Error updating complaint status.");
    }
  };

  const handleAssignComplaint = async (id) => {
    try {
      const res = await api.put(`/complaints/${id}/self-assign`);
      if (res.status === 200) {
        alert(res.data.message || "Complaint assigned successfully!");
        setViewingComplaint(null);
        fetchDashboardData();
      }
    } catch (err) {
      console.error("Error assigning complaint:", err);
      alert(
        err.response?.data?.message ||
          "Error assigning complaint. Maybe already assigned."
      );
    }
  };

  const handleUnassignComplaint = async (id) => {
    try {
      const res = await api.put(`/complaints/${id}/unassign`);
      if (res.status === 200) {
        const unassignedComplaint = res.data.complaint;
        setActivities((prev) => prev.filter((c) => c._id !== id));
        setNearbyComplaints((prev) => [unassignedComplaint, ...prev]);
        setViewingComplaint(null);
        alert(res.data.message || "Complaint unassigned successfully!");
      }
    } catch (err) {
      console.error("Error unassigning complaint:", err);
      alert(err.response?.data?.message || "Error unassigning complaint.");
    }
  };

  // Status Badge
  const StatusBadge = ({ status }) => {
    const colors = {
      Resolved: "bg-green-200 text-green-800",
      "In Progress": "bg-yellow-200 text-yellow-800",
      Pending: "bg-blue-200 text-blue-800",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          colors[status] || "bg-gray-200 text-gray-800"
        }`}
      >
        {status?.toUpperCase()}
      </span>
    );
  };

  const isActive = (path) =>
    location.pathname?.toLowerCase().includes(path.toLowerCase());

  if (!user)
    return (
      <div className="text-center mt-10 font-semibold">
        Loading Dashboard...
      </div>
    );

  // ---------------- JSX ----------------
  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Navbar */}
      <header className="flex flex-col md:flex-row justify-between items-center px-6 py-4 shadow-md bg-gray-50">
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <img src="/logo.png" alt="logo" className="w-6 h-6" />
          <span className="font-bold text-xl">CleanStreet</span>
        </div>
        <nav className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-8 text-gray-700 mb-2 md:mb-0">
          <Link
            to="/dashboard"
            className={`hover:underline font-medium ${
              isActive("/dashboard") ? "text-blue-600 font-bold" : ""
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
              <UserCircle className="w-8 h-8" />
            )}
            <span className="font-medium">{user?.username || "Guest"}</span>
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
<div className="mx-6 mt-2"> {/* <-- add top margin to avoid overlap */}
  <div
    className="w-full  h-40 rounded-2xl bg-cover bg-center flex items-center px-6 text-white"
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

      
      {/* Volunteer / User Dashboard */}
      <main className="flex flex-col items-center justify-start w-full mt-6 px-4 md:px-8 space-y-6">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {[
            { label: "Total", count: stats.total, icon: AlertTriangle, color: "text-red-500" },
            { label: "Pending", count: stats.pending, icon: Clock, color: "text-blue-500" },
            { label: "Resolved", count: stats.resolved, icon: CheckCircle, color: "text-green-500" },
            { label: "In Progress", count: stats.inProgress, icon: RefreshCcw, color: "text-yellow-500" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg flex flex-col items-center py-6">
              <p className="text-sm">{item.label}</p>
              <p className="text-3xl font-bold">{item.count}</p>
              <item.icon className={`${item.color} w-6 h-6 mt-2`} />
            </div>
          ))}
        </div>

        {/* Assigned / My Complaints */}
        <div className="bg-white rounded-2xl shadow-lg w-full p-6">
          <h3 className="font-semibold text-lg mb-4">
            {user.role === "volunteer" ? "My Assigned Complaints" : "My Reported Complaints"}
          </h3>

          {activities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((a) => (
                <div key={a._id} className="bg-gray-50 rounded-xl shadow-md border border-gray-200 p-4 flex flex-col">
                  {a.photo && <img src={a.photo} alt="complaint" className="w-full h-56 object-cover rounded-lg mb-3" />}
                  <p className="font-semibold text-lg">{a.title}</p>
                  <p className="text-sm text-gray-600">{a.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    <strong>Location:</strong>{" "}
                    {a.location?.address ||
                      a.location ||
                      (a.latitude && a.longitude
                        ? `${a.latitude.toFixed(4)}, ${a.longitude.toFixed(4)}`
                        : "Not specified")}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <strong>Reported By:</strong> {a.user?.username || "N/A"}
                  </p>
                  {a.volunteer && (
                    <p className="text-sm text-gray-500 mt-1">
                      <strong>Volunteer:</strong> {a.volunteer.username || "N/A"}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    <strong>Created At:</strong> {new Date(a.createdAt).toLocaleString()}
                  </p>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    <StatusBadge status={a.status} />
                    {user.role === "volunteer" && (
                      <>
                        <button
                          className="px-2 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600 text-sm"
                          onClick={() => handleVolunteerAction(a._id, "In Progress")}
                        >
                          In Progress
                        </button>
                        <button
                          className="px-2 py-1 rounded bg-green-500 text-white hover:bg-green-600 text-sm"
                          onClick={() => handleVolunteerAction(a._id, "Resolved")}
                        >
                          Resolve
                        </button>
                        <button
                          className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
                          onClick={() => handleUnassignComplaint(a._id)}
                        >
                          Unassign
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center">No complaints yet</p>
          )}
        </div>

        {/* Nearby Complaints */}
        {user.role === "volunteer" && nearbyComplaints.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg w-full p-6 mt-6">
            <h3 className="font-semibold text-lg mb-4">Nearby Complaints</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyComplaints.map((c) => (
                <div key={c._id} className="bg-gray-50 rounded-xl shadow-md border border-gray-200 p-4 flex flex-col">
                  {c.photo && <img src={c.photo} alt="complaint" className="w-full h-48 object-cover rounded mb-3" />}
                  <p className="font-semibold text-lg">{c.title}</p>
                  <p className="text-sm text-gray-600">{c.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    <strong>Location:</strong>{" "}
                    {c.location?.address ||
                      c.location ||
                      (c.latitude && c.longitude
                        ? `${c.latitude.toFixed(4)}, ${c.longitude.toFixed(4)}`
                        : "Not specified")}
                  </p>
                  <button
                    onClick={() => setViewingComplaint(c)}
                    className="mt-3 px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleAssignComplaint(c._id)}
                    className="mt-2 px-3 py-1 rounded bg-purple-500 text-white text-sm hover:bg-purple-600"
                  >
                    Assign to Me
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* View Complaint Modal */}
      {viewingComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 md:w-1/2 relative">
            <button
              onClick={() => setViewingComplaint(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <XCircle className="w-6 h-6" />
            </button>
            <h3 className="font-semibold text-xl">{viewingComplaint.title}</h3>
            {viewingComplaint.photo && (
              <img
                src={viewingComplaint.photo}
                alt="complaint"
                className="w-full h-64 object-cover rounded mt-2 mb-3"
              />
            )}
            <p className="text-gray-700">{viewingComplaint.description}</p>
            <p className="text-gray-500 mt-1">
              <strong>Location:</strong>{" "}
              {viewingComplaint.location?.address ||
                viewingComplaint.location ||
                (viewingComplaint.latitude && viewingComplaint.longitude
                  ? `${viewingComplaint.latitude.toFixed(4)}, ${viewingComplaint.longitude.toFixed(4)}`
                  : "Not specified")}
            </p>
            <p className="text-gray-500 mt-1">
              <strong>Status:</strong> {viewingComplaint.status}
            </p>
            <div className="mt-4 flex gap-3 flex-wrap">
              {user.role === "volunteer" && (
                <>
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                    onClick={() => handleVolunteerAction(viewingComplaint._id, "In Progress")}
                  >
                    In Progress
                  </button>
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                    onClick={() => handleVolunteerAction(viewingComplaint._id, "Resolved")}
                  >
                    Resolve
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    onClick={() => handleUnassignComplaint(viewingComplaint._id)}
                  >
                    Unassign
                  </button>
                </>
              )}
              {user.role === "volunteer" && !viewingComplaint.volunteer && (
                <button
                  className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                  onClick={() => handleAssignComplaint(viewingComplaint._id)}
                >
                  Assign to Me
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
