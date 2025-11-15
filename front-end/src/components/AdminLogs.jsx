import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/complaints/admin/logs`,
          { withCredentials: true }
        );
        setLogs(res.data || []);
      } catch (err) {
        console.error("Failed to fetch logs:", err);
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();

    const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("newAdminLog", (newLog) => {
      setLogs((prev) => [newLog, ...prev]);
    });

    return () => socket.disconnect();
  }, []);

  const formatTime = (isoTime) =>
    isoTime
      ? new Date(isoTime).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
      : "";

  // Highlight text colors
  const getActionStyle = (text) => {
    if (!text) return "text-gray-700";

    const t = text.toLowerCase();
    if (t.includes("assigned")) return "text-blue-600 font-semibold";
    if (t.includes("resolved")) return "text-green-600 font-semibold";
    if (t.includes("deleted")) return "text-red-600 font-semibold";
    if (t.includes("pending")) return "text-orange-600 font-semibold";
    if (t.includes("in progress")) return "text-yellow-600 font-semibold";

    return "text-gray-700";
  };

  const getStatusStyle = (status) => {
    if (!status) return "text-gray-700";

    const t = status.toLowerCase();
    if (t === "resolved") return "text-green-600 font-semibold";
    if (t === "assigned") return "text-blue-600 font-semibold";
    if (t === "deleted") return "text-red-600 font-semibold";
    if (t === "pending") return "text-orange-600 font-semibold";
    if (t === "in progress") return "text-yellow-600 font-semibold";

    return "text-gray-700";
  };

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(logs.length / logsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-12 py-4">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Clean Street" className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-black">Clean Street</h1>
          </div>

          <nav className="flex gap-10 text-gray-700 font-medium">
            {[{ path: "/dashboard", label: "Dashboard" },
              { path: "/report", label: "Report Issue" },
              { path: "/complaints", label: "Complaints" },
              { path: "/admin-logs", label: "Admin Logs" }].map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`${isActive(link.path)
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                    : "hover:text-blue-600"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <Link
            to="/login"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <main className="px-12 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">🧾 Admin Logs</h2>

          {/* Live Indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm text-gray-600">Live</span>
          </div>
        </div>

        {/* TABLE */}
        {loading ? (
          <p className="text-center text-gray-500 text-lg mt-16 animate-pulse">
            Loading logs...
          </p>
        ) : logs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-16">
            No admin activity found.
          </p>
        ) : (
          <>
            <div className="overflow-x-auto shadow rounded-lg bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Admin</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Action</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Complaint</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Volunteer</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">Time</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {currentLogs.map((log) => (
                    <tr key={log._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{log.adminName}</td>

                      {/* Highlighted Action */}
                      <td className={`px-6 py-4 text-sm ${getActionStyle(log.action)}`}>
                        {log.action}
                      </td>

                      {/* Complaint Title */}
                      <td className="px-6 py-4 text-sm font-bold">
                        {log.complaintTitle || "-"}
                      </td>

                      {/* Volunteer */}
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {log.volunteerName || "-"}
                      </td>

                      {/* Status */}
                      <td className={`px-6 py-4 text-sm ${getStatusStyle(log.status)}`}>
                        {log.status || "-"}
                      </td>

                      {/* Time */}
                      <td className="px-6 py-4 text-sm text-gray-500 text-right">
                        {formatTime(log.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-gray-700 font-medium">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
