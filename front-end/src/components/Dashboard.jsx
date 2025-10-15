// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   AlertTriangle,
//   Clock,
//   CheckCircle,
//   RefreshCcw,
//   UserCircle,
// } from "lucide-react";

// export default function Dashboard() {
//   const navigate = useNavigate();

//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     resolved: 0,
//     inProgress: 0,
//   });

//   const [activities, setActivities] = useState([]);
//   const [user, setUser] = useState(null); // ✅ User state

//   // ✅ Fetch logged-in user (with profilePic & username)
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/auth/profile", {
//           credentials: "include",
//         });
//         if (res.ok) {
//           const data = await res.json();
//           setUser(data); // Expect: { username, profilePic, ... }
//         }
//       } catch (err) {
//         console.error("Error fetching user:", err);
//       }
//     };
//     fetchUser();
//   }, []);

//   // ✅ Fetch dashboard stats
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
// //const res = await fetch("http://localhost:5000/api/dashboard", {
//         const res = await fetch("http://localhost:5000/api/complaints/dashboard", {

//           credentials: "include",
//         });
//         const data = await res.json();
//         setStats({
//           total: data.total || 0,
//           pending: data.pending || 0,
//           resolved: data.resolved || 0,
//           inProgress: data.inProgress || 0,
//         });
//         setActivities(data.activities || []);
//       } catch (err) {
//         console.error("Error fetching dashboard data:", err);
//       }
//     };
//     fetchDashboardData();
//   }, []);

//   // ✅ Signout
//   const handleLogout = async () => {
//     try {
//       await fetch("http://localhost:5000/api/auth/logout", {
//         method: "POST",
//         credentials: "include",
//       });
//       navigate("/"); // back to home
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white text-black">
//       {/* Navbar */}
//       <header className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
//         <div className="flex items-center space-x-2">
//           <img src="/logo.png" alt="logo" className="w-6 h-6" />
//           <span className="font-bold text-xl">CleanStreet</span>
//         </div>

//         <nav className="hidden md:flex space-x-8 text-gray-700">
//           <Link to="/dashboard" className="hover:underline">
//             Dashboard
//           </Link>
//           <Link to="/report" className="hover:underline">
//             Report Issue
//           </Link>
//           <Link to="/complaints" className="hover:underline">
//             View Complaints
//           </Link>
//         </nav>

//         {/* ✅ User Profile - now clickable */}
//         <div className="flex items-center space-x-4">
//           <div
//             className="flex items-center space-x-2 cursor-pointer"
//             onClick={() => navigate("/profile")}
//           >
//             {user?.profilePic ? (
//               // <img
//               //   src={`http://localhost:5000/uploads/${user.profilePic}`} // Backend URL
//               //   alt="profile"
//               //   className="w-8 h-8 rounded-full object-cover"
//               // />
//                   <img
//                     src={user.profilePic}
//                     alt="profile"
//                     className="w-8 h-8 rounded-full object-cover"
//                   />

//             ) : (
//               <UserCircle className="w-8 h-8" />
//             )}
//             <span className="font-medium">{user ? user.username : "Guest"}</span>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="px-4 py-1 rounded-full bg-blue-500 text-white font-semibold hover:bg-red-600 transition"
//           >
//             Sign out
//           </button>
//         </div>
//       </header>

//       {/* Pink banner */}
//       <div
//         className="w-full h-40 rounded-2xl mt-4 mx-6 bg-cover bg-center flex flex-col justify-center px-6 text-white"
//         style={{ backgroundImage: "url('/dashboard-bg.png')" }}
//       >
//         <h2 className="text-2xl font-semibold">Keep Our City Clean Together</h2>
//         <p className="text-sm">
//           Report issues, track progress, and help maintain our beautiful community
//         </p>
//       </div>

//       {/* Main Content */}
//       <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 px-6">
//         {/* Left Section */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="border rounded-xl flex flex-col items-center py-3">
//               <p className="text-sm">Total Issues</p>
//               <p className="text-xl font-bold">{stats.total}</p>
//               <AlertTriangle className="text-red-500 w-5 h-5" />
//             </div>
//             <div className="border rounded-xl flex flex-col items-center py-3">
//               <p className="text-sm">Pending</p>
//               <p className="text-xl font-bold">{stats.pending}</p>
//               <Clock className="text-blue-500 w-5 h-5" />
//             </div>
//             <div className="border rounded-xl flex flex-col items-center py-3">
//               <p className="text-sm">Resolved</p>
//               <p className="text-xl font-bold">{stats.resolved}</p>
//               <CheckCircle className="text-green-500 w-5 h-5" />
//             </div>
//             <div className="border rounded-xl flex flex-col items-center py-3">
//               <p className="text-sm">In Progress</p>
//               <p className="text-xl font-bold">{stats.inProgress}</p>
//               <RefreshCcw className="text-green-600 w-5 h-5" />
//             </div>
//           </div>

//           {/* Activity */}
//           <div className="border rounded-xl p-4">
//             <div className="flex justify-between items-center mb-3">
//               <h3 className="font-semibold">Activity</h3>
//               <span className="text-green-600 text-sm font-medium">
//                 Live Updates
//               </span>
//             </div>

//             {/* Activity List */}
//             <div className="space-y-3">
//               {activities.length > 0 ? (
//                 activities.map((activity, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg"
//                   >
//                     <UserCircle className="w-6 h-6 text-gray-700" />
//                     <div className="flex-1">
//                       <p className="font-medium">{activity.message}</p>
//                       <p className="text-gray-500 text-sm">{activity.time}</p>
//                     </div>
//                     {activity.status === "resolved" ? (
//                       <CheckCircle className="text-green-500 w-5 h-5" />
//                     ) : activity.status === "pending" ? (
//                       <Clock className="text-blue-500 w-5 h-5" />
//                     ) : (
//                       <AlertTriangle className="text-red-500 w-5 h-5" />
//                     )}
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500 text-sm">No recent activity</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="space-y-6">
//           {/* Quick Action */}
//           <div className="border rounded-xl p-4">
//             <h3 className="font-semibold mb-4">Quick Action</h3>
//             <button className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full py-2 mb-2 hover:shadow-lg transition">
//               + Report New Issue
//             </button>
//             <button className="w-full border rounded-full py-2 mb-2 hover:bg-gray-100">
//               My Complaints
//             </button>
//             <button className="w-full border rounded-full py-2 hover:bg-gray-100">
//               Recent Complaints
//             </button>
//           </div>

//           {/* Support Team */}
//           <div className="border rounded-xl p-4">
//             <h3 className="font-semibold mb-4">Support Team</h3>
//             <div className="flex items-center space-x-2 mb-4">
//               <UserCircle className="w-6 h-6" />
//               <div>
//                 <p className="font-semibold">Clean Street Support</p>
//                 <p className="text-sm text-gray-500">Available 24/7</p>
//               </div>
//             </div>
//             <button className="w-full border rounded-full py-2 hover:bg-gray-100">
//               Contact Support
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  RefreshCcw,
  UserCircle,
  Edit,
  Trash2,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    inProgress: 0,
  });

  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/complaints/dashboard", {
        credentials: "include",
      });
      const data = await res.json();
      setStats({
        total: data.total || 0,
        pending: data.pending || 0,
        resolved: data.resolved || 0,
        inProgress: data.inProgress || 0,
      });
      setActivities(data.activities || []);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // ✏️ Start editing
  const handleEditClick = (activity) => {
    setEditingId(activity._id);
    setEditForm({ title: activity.message, description: "" });
  };

  // 💾 Save changes
  const handleSaveEdit = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/complaints/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        await fetchDashboardData();
        setEditingId(null);
        alert("Complaint updated successfully");
      }
    } catch (err) {
      console.error("Error updating complaint:", err);
    }
  };

  // 🗑️ Delete complaint
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/complaints/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        await fetchDashboardData();
        alert("Complaint deleted successfully");
      }
    } catch (err) {
      console.error("Error deleting complaint:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="logo" className="w-6 h-6" />
          <span className="font-bold text-xl">CleanStreet</span>
        </div>

        <nav className="hidden md:flex space-x-8 text-gray-700">
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/report" className="hover:underline">
            Report Issue
          </Link>
          <Link to="/complaints" className="hover:underline">
            View Complaints
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
            <span className="font-medium">{user ? user.username : "Guest"}</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-1 rounded-full bg-blue-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Sign out
          </button>
        </div>
      </header>

      <div
        className="w-full h-40 rounded-2xl mt-4 mx-6 bg-cover bg-center flex flex-col justify-center px-6 text-white"
        style={{ backgroundImage: "url('/dashboard-bg.png')" }}
      >
        <h2 className="text-2xl font-semibold">Keep Our City Clean Together</h2>
        <p className="text-sm">
          Report issues, track progress, and help maintain our beautiful community
        </p>
      </div>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 px-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border rounded-xl flex flex-col items-center py-3">
              <p className="text-sm">Total Issues</p>
              <p className="text-xl font-bold">{stats.total}</p>
              <AlertTriangle className="text-red-500 w-5 h-5" />
            </div>
            <div className="border rounded-xl flex flex-col items-center py-3">
              <p className="text-sm">Pending</p>
              <p className="text-xl font-bold">{stats.pending}</p>
              <Clock className="text-blue-500 w-5 h-5" />
            </div>
            <div className="border rounded-xl flex flex-col items-center py-3">
              <p className="text-sm">Resolved</p>
              <p className="text-xl font-bold">{stats.resolved}</p>
              <CheckCircle className="text-green-500 w-5 h-5" />
            </div>
            <div className="border rounded-xl flex flex-col items-center py-3">
              <p className="text-sm">In Progress</p>
              <p className="text-xl font-bold">{stats.inProgress}</p>
              <RefreshCcw className="text-green-600 w-5 h-5" />
            </div>
          </div>

          {/* Activity */}
          <div className="border rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Activity</h3>
              <span className="text-green-600 text-sm font-medium">Live Updates</span>
            </div>

            <div className="space-y-3">
              {activities.length > 0 ? (
                activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <UserCircle className="w-6 h-6 text-gray-700" />
                      <div>
                        {editingId === activity._id ? (
                          <>
                            <input
                              type="text"
                              className="border rounded p-1 text-sm w-full mb-1"
                              value={editForm.title}
                              onChange={(e) =>
                                setEditForm({ ...editForm, title: e.target.value })
                              }
                            />
                            <textarea
                              className="border rounded p-1 text-sm w-full"
                              placeholder="Update description"
                              value={editForm.description}
                              onChange={(e) =>
                                setEditForm({ ...editForm, description: e.target.value })
                              }
                            />
                            <button
                              onClick={() => handleSaveEdit(activity._id)}
                              className="bg-blue-500 text-white px-3 py-1 rounded mt-2 text-sm"
                            >
                              Save
                            </button>
                          </>
                        ) : (
                          <>
                            <p className="font-medium">{activity.message}</p>
                            <p className="text-gray-500 text-sm">{activity.time}</p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditClick(activity)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(activity._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No recent activity</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          <div className="border rounded-xl p-4">
            <h3 className="font-semibold mb-4">Quick Action</h3>
            <button
              onClick={() => navigate("/report")}
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full py-2 mb-2 hover:shadow-lg transition"
            >
              + Report New Issue
            </button>
            <button
              onClick={() => navigate("/complaints")}
              className="w-full border rounded-full py-2 mb-2 hover:bg-gray-100"
            >
              My Complaints
            </button>
            <button
              onClick={() => navigate("/complaints")}
              className="w-full border rounded-full py-2 hover:bg-gray-100"
            >
              Recent Complaints
            </button>
          </div>

          <div className="border rounded-xl p-4">
            <h3 className="font-semibold mb-4">Support Team</h3>
            <div className="flex items-center space-x-2 mb-4">
              <UserCircle className="w-6 h-6" />
              <div>
                <p className="font-semibold">Clean Street Support</p>
                <p className="text-sm text-gray-500">Available 24/7</p>
              </div>
            </div>
            <button className="w-full border rounded-full py-2 hover:bg-gray-100">
              Contact Support
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
