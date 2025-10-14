// import React, { useState } from "react";
// import {
//   CheckCircle,
//   UserCircle,
//   RefreshCcw,
//   Home,
//   FileText,
//   Users,
//   BarChart2,
//   LogIn,
// } from "lucide-react";

// export default function AdminDashboard() {
//   // Dummy data
//   const [complaints] = useState([
//     { _id: "1", title: "Garbage not collected", user: { name: "John Doe" }, status: "Pending" },
//     { _id: "2", title: "Street light broken", user: { name: "Jane Smith" }, status: "Completed" },
//     { _id: "3", title: "Water leakage", user: { name: "Mike Johnson" }, status: "In Progress" },
//   ]);

//   const stats = {
//     totalComplaints: 120,
//     pendingReview: 15,
//     activeUsers: 80,
//     resolvedToday: 10,
//     communityImpact: 95,
//   };

//   // Dummy navigation handler
//   const handleNavigate = (page) => {
//     alert(`Navigate to ${page}`);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-md p-4 flex flex-col">
//         <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
//           <Home size={20} /> Admin Panel
//         </h2>
//         <nav className="flex flex-col gap-3">
//           <button onClick={() => handleNavigate("Overview")} className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-200">
//             <BarChart2 size={18} /> Overview
//           </button>
//           <button onClick={() => handleNavigate("Manage Complaints")} className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-200">
//             <FileText size={18} /> Manage Complaints
//           </button>
//           <button onClick={() => handleNavigate("Users")} className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-200">
//             <Users size={18} /> Users
//           </button>
//           <button onClick={() => handleNavigate("Reports")} className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-200">
//             <BarChart2 size={18} /> Reports
//           </button>
//         </nav>
//       </div>

//       {/* Main content */}
//       <div className="flex-1 p-6">
//         {/* Top Navbar */}
//         <div className="flex justify-between items-center mb-6 bg-white p-3 rounded shadow">
//           <div className="flex gap-4">
//             <button onClick={() => handleNavigate("Dashboard")} className="px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1">
//               <Home size={16} /> Dashboard
//             </button>
//             <button onClick={() => handleNavigate("Report Issue")} className="px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1">
//               <FileText size={16} /> Report Issue
//             </button>
//             <button onClick={() => handleNavigate("View Complaints")} className="px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1">
//               <Users size={16} /> View Complaints
//             </button>
//           </div>

//           {/* Login/Register button in top-right */}
//           <button onClick={() => handleNavigate("Login/Register")} className="px-3 py-1 rounded bg-blue-500 text-white flex items-center gap-1 hover:bg-blue-600">
//             <LogIn size={16} /> Login / Register
//           </button>
//         </div>

//         {/* System Overview */}
//         <div className="grid grid-cols-5 gap-4 mb-6">
//           <div className="bg-white p-4 rounded shadow text-center flex flex-col items-center justify-center gap-2">
//             <FileText size={20} className="text-blue-500" />
//             <p className="text-gray-500">Total Complaints</p>
//             <p className="text-2xl font-bold">{stats.totalComplaints}</p>
//           </div>
//           <div className="bg-white p-4 rounded shadow text-center flex flex-col items-center justify-center gap-2">
//             <FileText size={20} className="text-yellow-500" />
//             <p className="text-gray-500">Pending Review</p>
//             <p className="text-2xl font-bold">{stats.pendingReview}</p>
//           </div>
//           <div className="bg-white p-4 rounded shadow text-center flex flex-col items-center justify-center gap-2">
//             <Users size={20} className="text-green-500" />
//             <p className="text-gray-500">Active Users</p>
//             <p className="text-2xl font-bold">{stats.activeUsers}</p>
//           </div>
//           <div className="bg-white p-4 rounded shadow text-center flex flex-col items-center justify-center gap-2">
//             <CheckCircle size={20} className="text-purple-500" />
//             <p className="text-gray-500">Resolved Today</p>
//             <p className="text-2xl font-bold">{stats.resolvedToday}</p>
//           </div>
//           <div className="bg-white p-4 rounded shadow text-center flex flex-col items-center justify-center gap-2">
//             <BarChart2 size={20} className="text-red-500" />
//             <p className="text-gray-500">Community Impact</p>
//             <p className="text-2xl font-bold">{stats.communityImpact}%</p>
//           </div>
//         </div>

//         {/* Complaints List */}
//         <div className="grid gap-4">
//           {complaints.map((complaint) => (
//             <div key={complaint._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-lg transition-shadow">
//               <div className="flex flex-col md:flex-row md:items-center gap-4">
//                 <p><strong>Title:</strong> {complaint.title}</p>
//                 <p><strong>User:</strong> {complaint.user.name}</p>
//                 <p><strong>Status:</strong> {complaint.status}</p>
//               </div>

//               <div className="flex gap-2 mt-2 md:mt-0">
//                 <button className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
//                   <UserCircle size={18} /> Assign Volunteer
//                 </button>
//                 {complaint.status === "Completed" && <CheckCircle size={24} className="text-green-500" />}
//                 <button className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
//                   <RefreshCcw size={18} /> Refresh
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import React from "react";
import { Link } from "react-router-dom";
import { FileText, Users, BarChart2, CheckCircle, UserCircle, RefreshCcw, LogIn, UserPlus } from "lucide-react";

export default function AdminDashboard() {
  // Dummy stats data
  const stats = {
    totalComplaints: 120,
    pendingReview: 15,
    activeUsers: 80,
    resolvedToday: 10,
    communityImpact: 95,
  };

  // Dummy complaints data
  const complaints = [
    { _id: "1", title: "Garbage not collected", user: { name: "John Doe" }, status: "Pending" },
    { _id: "2", title: "Street light broken", user: { name: "Jane Smith" }, status: "Completed" },
    { _id: "3", title: "Water leakage", user: { name: "Mike Johnson" }, status: "In Progress" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4 flex flex-col h-screen">
        <div className="flex items-center mb-6 gap-2">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="flex flex-col gap-3 flex-1">
          <Link to="/dashboard" className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-200">
            <BarChart2 size={18} /> Overview
          </Link>
          <Link to="/complaints" className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-200">
            <FileText size={18} /> Manage Complaints
          </Link>
          <Link to="/users" className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-200">
            <Users size={18} /> Users
          </Link>
          <Link to="/reports" className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-200">
            <BarChart2 size={18} /> Reports
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="flex justify-between items-center bg-white p-4 shadow w-full sticky top-0 z-10">
          {/* App Name */}
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold text-gray-800">Clean Street</span>
          </div>

          {/* Nav Buttons */}
          <div className="flex gap-4">
            <Link to="/dashboard" className="px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1">Dashboard</Link>
            <Link to="/report-issue" className="px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1">Report Issue</Link>
            <Link to="/complaints" className="px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1">View Complaints</Link>
          </div>

          {/* Login/Register */}
          <div className="flex gap-2">
            <Link to="/login" className="px-3 py-1 rounded bg-blue-500 text-white flex items-center gap-1 hover:bg-blue-600">Login</Link>
            <Link to="/register" className="px-3 py-1 rounded bg-green-500 text-white flex items-center gap-1 hover:bg-green-600">Register</Link>
          </div>
        </div>

        {/* Admin Panel Content */}
        <div className="p-6 flex-1 overflow-auto">
          {/* Stats */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow text-center flex flex-col items-center justify-center gap-2">
              <FileText size={20} className="text-blue-500" />
              <p className="text-gray-500">Total Complaints</p>
              <p className="text-2xl font-bold">{stats.totalComplaints}</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center flex flex-col items-center justify-center gap-2">
              <FileText size={20} className="text-yellow-500" />
              <p className="text-gray-500">Pending Review</p>
              <p className="text-2xl font-bold">{stats.pendingReview}</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center flex flex-col items-center justify-center gap-2">
              <Users size={20} className="text-green-500" />
              <p className="text-gray-500">Active Users</p>
              <p className="text-2xl font-bold">{stats.activeUsers}</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center flex flex-col items-center justify-center gap-2">
              <CheckCircle size={20} className="text-purple-500" />
              <p className="text-gray-500">Resolved Today</p>
              <p className="text-2xl font-bold">{stats.resolvedToday}</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center flex flex-col items-center justify-center gap-2">
              <BarChart2 size={20} className="text-red-500" />
              <p className="text-gray-500">Community Impact</p>
              <p className="text-2xl font-bold">{stats.communityImpact}%</p>
            </div>
          </div>

          {/* Complaints */}
          <div className="grid gap-4">
            {complaints.map((complaint) => (
              <div key={complaint._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <p><strong>Title:</strong> {complaint.title}</p>
                  <p><strong>User:</strong> {complaint.user.name}</p>
                  <p><strong>Status:</strong> {complaint.status}</p>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                    <UserCircle size={18} /> Assign Volunteer
                  </button>
                  {complaint.status === "Completed" && <CheckCircle size={24} className="text-green-500" />}
                  <button className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    <RefreshCcw size={18} /> Refresh
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
