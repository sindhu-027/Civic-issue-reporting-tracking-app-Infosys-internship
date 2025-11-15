

// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";

// const socket = io(import.meta.env.VITE_SOCKET_URL);

// export default function AdminLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/complaints/admin/logs`);

//         setLogs(res.data || []);
//       } catch (err) {
//         console.error("Error fetching logs:", err);
//         // fallback mock data
//         setLogs([
//           {
//             id: 1,
//             adminName: "Sindhu",
//             volunteerName: "Ravi",
//             action: "assigned complaint to",
//             timestamp: new Date().toISOString(),
//           },
//         ]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();

//     socket.on("newLog", (newLog) => {
//       setLogs((prev) => [newLog, ...prev]);
//     });

//     return () => {
//       socket.off("newLog");
//     };
//   }, []);

//   const formatTime = (isoTime) =>
//     new Date(isoTime).toLocaleString("en-IN", {
//       dateStyle: "medium",
//       timeStyle: "short",
//     });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       {/* 🌟 Full-width Navbar */}
//       <header className="bg-white sticky top-0 z-10 shadow-sm border-b border-gray-100 w-full">
//         <div className="flex items-center justify-between px-10 py-4">
//           {/* Logo + Title */}
//           <div className="flex items-center space-x-3">
//             <img
//               src="/logo.png"
//               alt="Clean Street"
//               className="w-10 h-10 object-contain"
//             />
//             <h1 className="text-2xl font-bold text-black tracking-tight">
//               Clean Street
//             </h1>
//           </div>

//           {/* Navigation */}
//           <nav className="flex gap-8 text-gray-700 font-medium text-base">
//             {[
//               { path: "/dashboard", label: "Dashboard" },
//               { path: "/report", label: "Report Issue" },
//               { path: "/complaints", label: "Complaints" },
//               { path: "/admin-logs", label: "Admin Logs" },
//             ].map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`transition ${
//                   isActive(link.path)
//                     ? "text-blue-600 font-semibold"
//                     : "hover:text-blue-600"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       </header>

//       {/* 🌿 Full-width Main Section */}
//       <main className="w-full px-10 py-8">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
//             🧾 Admin Logs
//           </h2>

//           {/* 🟢 Live Indicator */}
//           <div className="flex items-center gap-2">
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//             </span>
//             <span className="text-sm text-gray-600">Live</span>
//           </div>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-500 mt-10 animate-pulse">
//             Loading logs...
//           </p>
//         ) : logs.length === 0 ? (
//           <p className="text-center text-gray-500 mt-10">
//             No admin activity recorded yet.
//           </p>
//         ) : (
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition w-full">
//             <ul className="space-y-4">
//               {logs.map((log, index) => {
//                 let icon, bgColor, textColor, message;

//                 switch (log.action) {
//                   case "assigned complaint to":
//                     icon = "📋";
//                     bgColor = "bg-blue-50";
//                     textColor = "text-blue-700";
//                     message = (
//                       <>
//                         <b>{log.adminName}</b> assigned complaint to{" "}
//                         <b>{log.volunteerName}</b>
//                       </>
//                     );
//                     break;
//                   case "resolved complaint":
//                     icon = "✅";
//                     bgColor = "bg-green-50";
//                     textColor = "text-green-700";
//                     message = (
//                       <>
//                         <b>{log.adminName}</b> resolved complaint{" "}
//                         <b>#{log.complaintId}</b>
//                       </>
//                     );
//                     break;
//                   case "deleted user":
//                     icon = "🗑️";
//                     bgColor = "bg-red-50";
//                     textColor = "text-red-700";
//                     message = (
//                       <>
//                         <b>{log.adminName}</b> deleted user{" "}
//                         <b>{log.userName}</b>
//                       </>
//                     );
//                     break;
//                   default:
//                     icon = "🧩";
//                     bgColor = "bg-gray-50";
//                     textColor = "text-gray-700";
//                     message = `${log.adminName} ${log.action}`;
//                 }

//                 return (
//                   <li
//                     key={index}
//                     className={`flex items-start gap-4 p-4 rounded-xl ${bgColor} hover:shadow-md transition duration-200`}
//                   >
//                     <div className="text-2xl">{icon}</div>
//                     <div className="flex flex-col">
//                       <p className={`text-base ${textColor}`}>{message}</p>
//                       <span className="text-xs text-gray-500 mt-1">
//                         {formatTime(log.timestamp)}
//                       </span>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";

// const socket = io(import.meta.env.VITE_SOCKET_URL);

// export default function AdminLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/complaints/admin/logs`);
//         setLogs(res.data || []);
//       } catch (err) {
//         console.error("Error fetching logs:", err);
//         setLogs([
//           {
//             id: 1,
//             adminName: "Sindhu",
//             action: "updated status to Resolved",
//             timestamp: new Date().toISOString(),
//           },
//         ]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();

//     socket.on("newLog", (newLog) => {
//       setLogs((prev) => [newLog, ...prev]);
//     });

//     return () => {
//       socket.off("newLog");
//     };
//   }, []);

//   const formatTime = (isoTime) => {
//     if (!isoTime || isoTime === "Invalid Date") return "";
//     return new Date(isoTime).toLocaleString("en-IN", {
//       dateStyle: "medium",
//       timeStyle: "short",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* 🌟 Header */}
//       <header className="bg-white border-b shadow-sm sticky top-0 z-10">
//         <div className="flex items-center justify-between px-12 py-4">
//           <div className="flex items-center space-x-3">
//             <img src="/logo.png" alt="Clean Street" className="w-10 h-10 object-contain" />
//             <h1 className="text-2xl font-bold text-black">Clean Street</h1>
//           </div>

//           <nav className="flex gap-10 text-gray-700 font-medium">
//             {[
//               { path: "/dashboard", label: "Dashboard" },
//               { path: "/report", label: "Report Issue" },
//               { path: "/complaints", label: "Complaints" },
//               { path: "/admin-logs", label: "Admin Logs" },
//             ].map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`${
//                   isActive(link.path)
//                     ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
//                     : "hover:text-blue-600"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       </header>

//       {/* 🌿 Main */}
//       <main className="px-12 py-10">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
//             🧾 Admin Logs
//           </h2>

//           <div className="flex items-center gap-2">
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//             </span>
//             <span className="text-sm text-gray-600">Live</span>
//           </div>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-500 mt-16 animate-pulse text-lg">
//             Loading logs...
//           </p>
//         ) : logs.length === 0 ? (
//           <p className="text-center text-gray-500 mt-16 text-lg">
//             No admin activity recorded yet.
//           </p>
//         ) : (
//           <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-6 w-full">
//             <ul className="space-y-4">
//               {logs.map((log, index) => {
                
//                 let icon = "🧩";
//                 let bgColor = "bg-gray-50";
//                 let textColor = "text-gray-700";

//                 if (log.action?.includes("assigned")) {
//                   icon = "📋";
//                   bgColor = "bg-blue-50";
//                   textColor = "text-blue-700";
//                 } else if (log.action?.includes("Resolved")) {
//                   icon = "✅";
//                   bgColor = "bg-green-50";
//                   textColor = "text-green-700";
//                 } else if (log.action?.includes("deleted")) {
//                   icon = "🗑️";
//                   bgColor = "bg-red-50";
//                   textColor = "text-red-700";
//                 }

//                 return (
//                   <li
//                     key={index}
//                     className={`flex items-start gap-4 p-4 rounded-xl ${bgColor} hover:shadow-md transition duration-200`}
//                   >
//                     <div className="text-2xl">{icon}</div>
//                     <div className="flex flex-col">
//                       <p className={`text-base font-medium ${textColor}`}>
//                         <b>{log.adminName}</b> {log.action}
//                       </p>
//                       <span className="text-xs text-gray-500 mt-1">
//                         {formatTime(log.timestamp)}
//                       </span>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";

// const socket = io(import.meta.env.VITE_SOCKET_URL);

// export default function AdminLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/complaints/admin/logs`);
//         // ✅ Show only admin actions (assign / resolve / delete)
//         const adminActions = res.data.filter(
//           (log) =>
//             log.adminName &&
//             (log.action.includes("assigned") ||
//               log.action.includes("Resolved") ||
//               log.action.includes("deleted"))
//         );
//         setLogs(adminActions || []);
//       } catch (err) {
//         console.error("Error fetching logs:", err);
//         setLogs([
//           {
//             id: 1,
//             adminName: "Sindhu",
//             action: "updated status to Resolved",
//             timestamp: new Date().toISOString(),
//           },
//         ]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();

//     socket.on("newLog", (newLog) => {
//       if (
//         newLog.adminName &&
//         (newLog.action.includes("assigned") ||
//           newLog.action.includes("Resolved") ||
//           newLog.action.includes("deleted"))
//       ) {
//         setLogs((prev) => [newLog, ...prev]);
//       }
//     });

//     return () => {
//       socket.off("newLog");
//     };
//   }, []);

//   const formatTime = (isoTime) => {
//     if (!isoTime || isoTime === "Invalid Date") return "";
//     return new Date(isoTime).toLocaleString("en-IN", {
//       dateStyle: "medium",
//       timeStyle: "short",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       {/* 🌟 Header */}
//       <header className="bg-white border-b shadow-sm sticky top-0 z-10">
//         <div className="flex items-center justify-between px-12 py-4">
//           <div className="flex items-center space-x-3">
//             <img src="/logo.png" alt="Clean Street" className="w-10 h-10 object-contain" />
//             <h1 className="text-2xl font-bold text-black">Clean Street</h1>
//           </div>

//           <nav className="flex gap-10 text-gray-700 font-medium">
//             {[
//               { path: "/dashboard", label: "Dashboard" },
//               { path: "/report", label: "Report Issue" },
//               { path: "/complaints", label: "Complaints" },
//               { path: "/admin-logs", label: "Admin Logs" },
//             ].map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`${
//                   isActive(link.path)
//                     ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
//                     : "hover:text-blue-600"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       </header>

//       {/* 🌿 Main */}
//       <main className="px-12 py-10">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
//             🧾 Admin Logs
//           </h2>

//           <div className="flex items-center gap-2">
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//             </span>
//             <span className="text-sm text-gray-600">Live</span>
//           </div>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-500 mt-16 animate-pulse text-lg">
//             Loading logs...
//           </p>
//         ) : logs.length === 0 ? (
//           <p className="text-center text-gray-500 mt-16 text-lg">
//             No admin activity recorded yet.
//           </p>
//         ) : (
//           <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 w-full">
//             <ul className="space-y-4">
//               {logs.map((log, index) => {
//                 let icon = "🧩";
//                 let bgColor = "bg-gray-50";
//                 let textColor = "text-gray-700";

//                 if (log.action?.includes("assigned")) {
//                   icon = "📋";
//                   bgColor = "bg-blue-50";
//                   textColor = "text-blue-700";
//                 } else if (log.action?.includes("Resolved")) {
//                   icon = "✅";
//                   bgColor = "bg-green-50";
//                   textColor = "text-green-700";
//                 } else if (log.action?.includes("deleted")) {
//                   icon = "🗑️";
//                   bgColor = "bg-red-50";
//                   textColor = "text-red-700";
//                 }

//                 return (
//                   <li
//                     key={index}
//                     className={`flex items-start gap-4 p-4 rounded-xl ${bgColor} hover:shadow-md transition duration-200`}
//                   >
//                     <div className="text-2xl">{icon}</div>
//                     <div className="flex flex-col">
//                       <p className={`text-base font-medium ${textColor}`}>
//                         <b>{log.adminName}</b> {log.action}
//                       </p>
//                       <span className="text-xs text-gray-500 mt-1">
//                         {formatTime(log.timestamp)}
//                       </span>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";

// const socket = io(import.meta.env.VITE_SOCKET_URL);

// export default function AdminLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/complaints/admin/logs`);
//         setLogs(res.data || []);
//       } catch (err) {
//         console.error("Error fetching logs:", err);
//         setLogs([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();

//     socket.on("newAdminLog", (newLog) => {
//       if (newLog.role === "admin") setLogs((prev) => [newLog, ...prev]);
//     });

//     return () => socket.off("newAdminLog");
//   }, []);

//   const formatTime = (isoTime) =>
//     isoTime
//       ? new Date(isoTime).toLocaleString("en-IN", {
//           dateStyle: "medium",
//           timeStyle: "short",
//         })
//       : "";

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       <header className="bg-white border-b shadow-sm sticky top-0 z-10">
//         <div className="flex items-center justify-between px-12 py-4">
//           <div className="flex items-center space-x-3">
//             <img src="/logo.png" alt="Clean Street" className="w-10 h-10 object-contain" />
//             <h1 className="text-2xl font-bold text-black">Clean Street</h1>
//           </div>
//           <nav className="flex gap-10 text-gray-700 font-medium">
//             {[
//               { path: "/dashboard", label: "Dashboard" },
//               { path: "/report", label: "Report Issue" },
//               { path: "/complaints", label: "Complaints" },
//               { path: "/admin-logs", label: "Admin Logs" },
//             ].map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`${
//                   isActive(link.path)
//                     ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
//                     : "hover:text-blue-600"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       </header>

//       <main className="px-12 py-10">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">🧾 Admin Logs</h2>
//           <div className="flex items-center gap-2">
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//             </span>
//             <span className="text-sm text-gray-600">Live</span>
//           </div>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-500 mt-16 animate-pulse text-lg">Loading logs...</p>
//         ) : logs.length === 0 ? (
//           <p className="text-center text-gray-500 mt-16 text-lg">No admin activity recorded yet.</p>
//         ) : (
//           <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 w-full">
//             <ul className="space-y-4">
//               {logs.map((log, index) => {
//                 let icon = "🧩";
//                 let bgColor = "bg-gray-50";
//                 let textColor = "text-gray-700";

//                 if (log.action?.toLowerCase().includes("assigned")) {
//                   icon = "📋";
//                   bgColor = "bg-blue-50";
//                   textColor = "text-blue-700";
//                 } else if (log.action?.toLowerCase().includes("resolved") || log.action?.toLowerCase().includes("updated status")) {
//                   icon = "✅";
//                   bgColor = "bg-green-50";
//                   textColor = "text-green-700";
//                 } else if (log.action?.toLowerCase().includes("deleted")) {
//                   icon = "🗑️";
//                   bgColor = "bg-red-50";
//                   textColor = "text-red-700";
//                 }

//                 return (
//                   <li
//                     key={index}
//                     className={`flex items-start gap-4 p-4 rounded-xl ${bgColor} hover:shadow-md transition duration-200`}
//                   >
//                     <div className="text-2xl">{icon}</div>
//                     <div className="flex flex-col">
//                       <p className={`text-base font-medium ${textColor}`}>
//                         <b>{log.adminName}</b> {log.action} {log.volunteerName ? `to ${log.volunteerName}` : ""}
//                       </p>
//                       <span className="text-xs text-gray-500 mt-1">{formatTime(log.timestamp)}</span>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";

// // Connect to socket

// const socket = io(import.meta.env.VITE_SOCKET_URL, {
//   transports: ["websocket"], // ✅ only WebSocket
// });


// export default function AdminLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   useEffect(() => {
//     // Fetch existing logs from backend
//     const fetchLogs = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/complaints/admin/logs`);
//          console.log("Fetched logs:", res.data); // <-- Check in console
//         setLogs(res.data || []);
//       } catch (err) {
//         console.error("Error fetching logs:", err);
//         setLogs([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();

//     // Listen for new logs from socket
//     socket.on("newAdminLog", (newLog) => {
//       // Prepend the new log to the list
//       setLogs((prev) => [newLog, ...prev]);
//     });

//     return () => socket.off("newAdminLog");
//   }, []);

//   // Format timestamp
//   const formatTime = (isoTime) =>
//     isoTime
//       ? new Date(isoTime).toLocaleString("en-IN", {
//           dateStyle: "medium",
//           timeStyle: "short",
//         })
//       : "";

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       <header className="bg-white border-b shadow-sm sticky top-0 z-10">
//         <div className="flex items-center justify-between px-12 py-4">
//           <div className="flex items-center space-x-3">
//             <img src="/logo.png" alt="Clean Street" className="w-10 h-10 object-contain" />
//             <h1 className="text-2xl font-bold text-black">Clean Street</h1>
//           </div>
//           <nav className="flex gap-10 text-gray-700 font-medium">
//             {[
//               { path: "/dashboard", label: "Dashboard" },
//               { path: "/report", label: "Report Issue" },
//               { path: "/complaints", label: "Complaints" },
//               { path: "/admin-logs", label: "Admin Logs" },
//             ].map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`${
//                   isActive(link.path)
//                     ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
//                     : "hover:text-blue-600"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       </header>

//       <main className="px-12 py-10">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">🧾 Admin Logs</h2>
//           <div className="flex items-center gap-2">
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//             </span>
//             <span className="text-sm text-gray-600">Live</span>
//           </div>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-500 mt-16 animate-pulse text-lg">Loading logs...</p>
//         ) : logs.length === 0 ? (
//           <p className="text-center text-gray-500 mt-16 text-lg">No admin activity recorded yet.</p>
//         ) : (
//           <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 w-full">
//             <ul className="space-y-4">
//               {logs.map((log, index) => {
//                 const actionLower = log.action?.toLowerCase() || "";
//                 let icon = "🧩";
//                 let bgColor = "bg-gray-50";
//                 let textColor = "text-gray-700";

//                 if (actionLower.includes("assigned")) {
//                   icon = "📋";
//                   bgColor = "bg-blue-50";
//                   textColor = "text-blue-700";
//                 } else if (actionLower.includes("resolved") || actionLower.includes("updated status")) {
//                   icon = "✅";
//                   bgColor = "bg-green-50";
//                   textColor = "text-green-700";
//                 } else if (actionLower.includes("deleted")) {
//                   icon = "🗑️";
//                   bgColor = "bg-red-50";
//                   textColor = "text-red-700";
//                 }

//                 return (
//                   <li
//                     key={index}
//                     className={`flex items-start gap-4 p-4 rounded-xl ${bgColor} hover:shadow-md transition duration-200`}
//                   >
//                     <div className="text-2xl">{icon}</div>
//                     <div className="flex flex-col">
//                       <p className={`text-base font-medium ${textColor}`}>
//                         <b>{log.adminName}</b> {log.action}{" "}
//                         {log.volunteerName ? `to ${log.volunteerName}` : ""}
//                       </p>
//                       <span className="text-xs text-gray-500 mt-1">{formatTime(log.createdAt)}</span>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";

// // ✅ Connect to Socket.IO (websocket only)
// const socket = io(import.meta.env.VITE_SOCKET_URL, {
//   transports: ["websocket"], // disable polling
//   reconnectionAttempts: 5,
//   reconnectionDelay: 1000,
// });

// export default function AdminLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   useEffect(() => {
//     // Fetch existing logs from backend
//     const fetchLogs = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/complaints/admin/logs`
//         );
//         console.log("Fetched logs:", res.data);
//         setLogs(res.data || []);
//       } catch (err) {
//         console.error("Error fetching logs:", err);
//         setLogs([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();

//     // Listen for new logs via Socket.IO
//     socket.on("newAdminLog", (newLog) => {
//       console.log("New log received:", newLog);
//       setLogs((prev) => [newLog, ...prev]);
//     });

//     // Cleanup socket listener
//     return () => socket.off("newAdminLog");
//   }, []);

//   // Format timestamp
//   const formatTime = (isoTime) =>
//     isoTime
//       ? new Date(isoTime).toLocaleString("en-IN", {
//           dateStyle: "medium",
//           timeStyle: "short",
//         })
//       : "";

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       <header className="bg-white border-b shadow-sm sticky top-0 z-10">
//         <div className="flex items-center justify-between px-12 py-4">
//           <div className="flex items-center space-x-3">
//             <img src="/logo.png" alt="Clean Street" className="w-10 h-10 object-contain" />
//             <h1 className="text-2xl font-bold text-black">Clean Street</h1>
//           </div>
//           <nav className="flex gap-10 text-gray-700 font-medium">
//             {[
//               { path: "/dashboard", label: "Dashboard" },
//               { path: "/report", label: "Report Issue" },
//               { path: "/complaints", label: "Complaints" },
//               { path: "/admin-logs", label: "Admin Logs" },
//             ].map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`${
//                   isActive(link.path)
//                     ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
//                     : "hover:text-blue-600"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       </header>

//       <main className="px-12 py-10">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
//             🧾 Admin Logs
//           </h2>
//           <div className="flex items-center gap-2">
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//             </span>
//             <span className="text-sm text-gray-600">Live</span>
//           </div>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-500 mt-16 animate-pulse text-lg">Loading logs...</p>
//         ) : logs.length === 0 ? (
//           <p className="text-center text-gray-500 mt-16 text-lg">No admin activity recorded yet.</p>
//         ) : (
//           <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 w-full">
//             <ul className="space-y-4">
//               {logs.map((log, index) => {
//                 const actionLower = log.action?.toLowerCase() || "";
//                 let icon = "🧩";
//                 let bgColor = "bg-gray-50";
//                 let textColor = "text-gray-700";

//                 if (actionLower.includes("assigned")) {
//                   icon = "📋";
//                   bgColor = "bg-blue-50";
//                   textColor = "text-blue-700";
//                 } else if (actionLower.includes("resolved") || actionLower.includes("updated status")) {
//                   icon = "✅";
//                   bgColor = "bg-green-50";
//                   textColor = "text-green-700";
//                 } else if (actionLower.includes("deleted")) {
//                   icon = "🗑️";
//                   bgColor = "bg-red-50";
//                   textColor = "text-red-700";
//                 }

//                 return (
//                   <li
//                     key={index}
//                     className={`flex items-start gap-4 p-4 rounded-xl ${bgColor} hover:shadow-md transition duration-200`}
//                   >
//                     <div className="text-2xl">{icon}</div>
//                     <div className="flex flex-col">
//                       <p className={`text-base font-medium ${textColor}`}>
//                         <b>{log.adminName}</b> {log.action}{" "}
//                         {log.volunteerName ? `to ${log.volunteerName}` : ""}
//                       </p>
//                       <span className="text-xs text-gray-500 mt-1">
//                         {formatTime(log.timestamp || log.createdAt)}
//                       </span>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";

// // ✅ Connect to Socket.IO (websocket only)
// const socket = io(import.meta.env.VITE_SOCKET_URL, {
//   transports: ["websocket"],
//   reconnectionAttempts: 5,
//   reconnectionDelay: 1000,
// });

// export default function AdminLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/complaints/admin/logs`
//         );
//         console.log("Fetched logs:", res.data);
//         setLogs(res.data || []);
//       } catch (err) {
//         console.error("Error fetching logs:", err);
//         setLogs([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();

//     socket.on("newAdminLog", (newLog) => {
//       console.log("New log received:", newLog);
//       setLogs((prev) => [newLog, ...prev]);
//     });

//     return () => socket.off("newAdminLog");
//   }, []);

//   const formatTime = (isoTime) =>
//     isoTime
//       ? new Date(isoTime).toLocaleString("en-IN", {
//           dateStyle: "medium",
//           timeStyle: "short",
//         })
//       : "";

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       {/* Header */}
//       <header className="bg-white border-b shadow-sm sticky top-0 z-10">
//         <div className="flex items-center justify-between px-12 py-4">
//           <div className="flex items-center space-x-3">
//             <img src="/logo.png" alt="Clean Street" className="w-10 h-10 object-contain" />
//             <h1 className="text-2xl font-bold text-black">Clean Street</h1>
//           </div>
//           <nav className="flex gap-10 text-gray-700 font-medium">
//             {[
//               { path: "/dashboard", label: "Dashboard" },
//               { path: "/report", label: "Report Issue" },
//               { path: "/complaints", label: "Complaints" },
//               { path: "/admin-logs", label: "Admin Logs" },
//             ].map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`${
//                   isActive(link.path)
//                     ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
//                     : "hover:text-blue-600"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="px-12 py-10">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
//             🧾 Admin Logs
//           </h2>
//           <div className="flex items-center gap-2">
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//             </span>
//             <span className="text-sm text-gray-600">Live</span>
//           </div>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-500 mt-16 animate-pulse text-lg">Loading logs...</p>
//         ) : logs.length === 0 ? (
//           <p className="text-center text-gray-500 mt-16 text-lg">No admin activity recorded yet.</p>
//         ) : (
//           <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 w-full max-h-[70vh] overflow-y-auto">
//             <ul className="space-y-4">
//               {logs.map((log) => {
//                 const actionLower = log.action?.toLowerCase() || "";
//                 let icon = "🧩";
//                 let bgColor = "bg-gray-50";
//                 let textColor = "text-gray-700";

//                 if (actionLower.includes("assigned")) {
//                   icon = "📋";
//                   bgColor = "bg-blue-50";
//                   textColor = "text-blue-700";
//                 } else if (actionLower.includes("resolved") || actionLower.includes("updated status")) {
//                   icon = "✅";
//                   bgColor = "bg-green-50";
//                   textColor = "text-green-700";
//                 } else if (actionLower.includes("deleted")) {
//                   icon = "🗑️";
//                   bgColor = "bg-red-50";
//                   textColor = "text-red-700";
//                 }

//                 return (
//                   <li
//                     key={log._id}
//                     className={`flex items-start gap-4 p-4 rounded-xl ${bgColor} hover:shadow-md transition duration-200`}
//                   >
//                     <div className="text-2xl">{icon}</div>
//                     <div className="flex flex-col">
//                       <p className={`text-base font-medium ${textColor}`}>
//                         <b>{log.adminName}</b> {log.action}{" "}
//                         {log.volunteerName && log.volunteerName !== "N/A"
//                           ? `to ${log.volunteerName}`
//                           : ""}
//                       </p>
//                       <span className="text-xs text-gray-500 mt-1">
//                         {formatTime(log.timestamp)}
//                       </span>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";

// // Connect to Socket.IO
// const socket = io(import.meta.env.VITE_SOCKET_URL, {
//   transports: ["websocket"],
//   reconnectionAttempts: 5,
//   reconnectionDelay: 1000,
// });

// export default function AdminLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/complaints/admin/logs`
//         );
//         setLogs(res.data || []);
//       } catch (err) {
//         console.error("Error fetching logs:", err);
//         setLogs([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();

//     socket.on("newAdminLog", (newLog) => {
//       setLogs((prev) => [newLog, ...prev]);
//     });

//     return () => socket.off("newAdminLog");
//   }, []);

//   const formatTime = (isoTime) =>
//     isoTime
//       ? new Date(isoTime).toLocaleString("en-IN", {
//           dateStyle: "medium",
//           timeStyle: "short",
//         })
//       : "";

//   const getLogStyle = (action) => {
//     const a = action?.toLowerCase() || "";
//     if (a.includes("resolved")) return { icon: "✅", bg: "bg-green-50", text: "text-green-700" };
//     if (a.includes("in progress") || a.includes("updated status")) return { icon: "🔄", bg: "bg-yellow-50", text: "text-yellow-700" };
//     if (a.includes("pending")) return { icon: "⏳", bg: "bg-red-50", text: "text-red-700" };
//     if (a.includes("assigned")) return { icon: "📋", bg: "bg-blue-50", text: "text-blue-700" };
//     if (a.includes("deleted")) return { icon: "🗑️", bg: "bg-red-50", text: "text-red-700" };
//     return { icon: "🧩", bg: "bg-gray-50", text: "text-gray-700" };
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       {/* Header */}
//       <header className="bg-white border-b shadow-sm sticky top-0 z-10">
//         <div className="flex items-center justify-between px-12 py-4">
//           <div className="flex items-center space-x-3">
//             <img src="/logo.png" alt="Clean Street" className="w-10 h-10 object-contain" />
//             <h1 className="text-2xl font-bold text-black">Clean Street</h1>
//           </div>
//           <nav className="flex gap-10 text-gray-700 font-medium">
//             {[{ path: "/dashboard", label: "Dashboard" },
//               { path: "/report", label: "Report Issue" },
//               { path: "/complaints", label: "Complaints" },
//               { path: "/admin-logs", label: "Admin Logs" }].map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`${isActive(link.path) ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1" : "hover:text-blue-600"}`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="px-12 py-10">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
//             🧾 Admin Logs
//           </h2>
//           <div className="flex items-center gap-2">
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//             </span>
//             <span className="text-sm text-gray-600">Live</span>
//           </div>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-500 mt-16 animate-pulse text-lg">Loading logs...</p>
//         ) : logs.length === 0 ? (
//           <p className="text-center text-gray-500 mt-16 text-lg">No admin activity recorded yet.</p>
//         ) : (
//           <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 w-full max-h-[70vh] overflow-y-auto">
//             <ul className="space-y-4">
//               {logs.map((log) => {
//                 const { icon, bg, text } = getLogStyle(log.action);
//                 return (
//                   <li
//                     key={log._id}
//                     className={`flex items-start gap-4 p-4 rounded-xl ${bg} hover:shadow-md transition duration-200`}
//                   >
//                     <div className="text-2xl">{icon}</div>
//                     <div className="flex flex-col">
//                       <p className={`text-base font-medium ${text}`}>
//                         <b>{log.adminName}</b> {log.action}{" "}
//                         {log.volunteerName && log.volunteerName !== "N/A" ? `to ${log.volunteerName}` : ""}
//                       </p>
//                       <span className="text-xs text-gray-500 mt-1">
//                         {formatTime(log.timestamp)}
//                       </span>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";

// // Connect to Socket.IO
// const socket = io(import.meta.env.VITE_SOCKET_URL, {
//   transports: ["websocket"],
//   reconnectionAttempts: 5,
//   reconnectionDelay: 1000,
// });

// export default function AdminLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const logsPerPage = 10; // Show 10 logs per page
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/complaints/admin/logs`
//         );
//         setLogs(res.data || []);
//       } catch (err) {
//         console.error("Error fetching logs:", err);
//         setLogs([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();

//     socket.on("newAdminLog", (newLog) => {
//       setLogs((prev) => [newLog, ...prev]);
//     });

//     return () => socket.off("newAdminLog");
//   }, []);

//   const formatTime = (isoTime) =>
//     isoTime
//       ? new Date(isoTime).toLocaleString("en-IN", {
//           dateStyle: "medium",
//           timeStyle: "short",
//         })
//       : "";

//   const getLogStyle = (action) => {
//     const a = action?.toLowerCase() || "";
//     if (a.includes("resolved")) return { icon: "✅", bg: "bg-green-50", text: "text-green-700" };
//     if (a.includes("in progress") || a.includes("updated status")) return { icon: "🔄", bg: "bg-yellow-50", text: "text-yellow-700" };
//     if (a.includes("pending")) return { icon: "⏳", bg: "bg-orange-50", text: "text-orange-700" };
//     if (a.includes("assigned")) return { icon: "📋", bg: "bg-blue-50", text: "text-blue-700" };
//     if (a.includes("deleted")) return { icon: "🗑️", bg: "bg-red-50", text: "text-red-700" };
//     return { icon: "🧩", bg: "bg-gray-50", text: "text-gray-700" };
//   };

//   // Pagination calculations
//   const indexOfLastLog = currentPage * logsPerPage;
//   const indexOfFirstLog = indexOfLastLog - logsPerPage;
//   const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
//   const totalPages = Math.ceil(logs.length / logsPerPage);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       {/* Header */}
//       <header className="bg-white border-b shadow-sm sticky top-0 z-10">
//         <div className="flex items-center justify-between px-12 py-4">
//           <div className="flex items-center space-x-3">
//             <img src="/logo.png" alt="Clean Street" className="w-10 h-10 object-contain" />
//             <h1 className="text-2xl font-bold text-black">Clean Street</h1>
//           </div>
//           <nav className="flex gap-10 text-gray-700 font-medium">
//             {[{ path: "/dashboard", label: "Dashboard" },
//               { path: "/report", label: "Report Issue" },
//               { path: "/complaints", label: "Complaints" },
//               { path: "/admin-logs", label: "Admin Logs" }].map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`${isActive(link.path) ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1" : "hover:text-blue-600"}`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="px-12 py-10">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
//             🧾 Admin Logs
//           </h2>
//           <div className="flex items-center gap-2">
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//             </span>
//             <span className="text-sm text-gray-600">Live</span>
//           </div>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-500 mt-16 animate-pulse text-lg">Loading logs...</p>
//         ) : logs.length === 0 ? (
//           <p className="text-center text-gray-500 mt-16 text-lg">No admin activity recorded yet.</p>
//         ) : (
//           <>
//             <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 w-full max-h-[60vh] overflow-y-auto">
//               <ul className="space-y-4">
//                 {currentLogs.map((log) => {
//                   const { icon, bg, text } = getLogStyle(log.action);
//                   return (
//                     <li
//                       key={log._id}
//                       className={`flex items-start gap-4 p-4 rounded-xl ${bg} hover:shadow-md transition duration-200`}
//                     >
//                       <div className="text-2xl">{icon}</div>
//                       <div className="flex flex-col">
//                         <p className={`text-base font-medium ${text}`}>
//                           <b>{log.adminName}</b> {log.action}{" "}
//                           {log.volunteerName && log.volunteerName !== "N/A" ? `to ${log.volunteerName}` : ""}
//                         </p>
//                         <span className="text-xs text-gray-500 mt-1">
//                           {formatTime(log.timestamp)}
//                         </span>
//                       </div>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center items-center gap-4 mt-6">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               <span className="text-gray-700 font-medium">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";

// // Connect to Socket.IO
// const socket = io(import.meta.env.VITE_SOCKET_URL, {
//   transports: ["websocket"],
//   reconnectionAttempts: 5,
//   reconnectionDelay: 1000,
// });

// export default function AdminLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const logsPerPage = 10; // Show 10 logs per page
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/complaints/admin/logs`
//         );
//         console.log("Logs from API:", res.data); // Check timestamp field
//         setLogs(res.data || []);
//       } catch (err) {
//         console.error("Error fetching logs:", err);
//         setLogs([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();

//     socket.on("newAdminLog", (newLog) => {
//       setLogs((prev) => [newLog, ...prev]);
//     });

//     return () => socket.off("newAdminLog");
//   }, []);

//   // Format timestamp
//   const formatTime = (isoTime) =>
//     isoTime
//       ? new Date(isoTime).toLocaleString("en-IN", {
//           dateStyle: "medium",
//           timeStyle: "short",
//         })
//       : "No time available";

//   // Style logs based on action
//   const getLogStyle = (action) => {
//     const a = action?.toLowerCase() || "";
//     if (a.includes("resolved"))
//       return { icon: "✅", bg: "bg-green-50", text: "text-green-700" };
//     if (a.includes("in progress") || a.includes("updated status"))
//       return { icon: "🔄", bg: "bg-yellow-50", text: "text-yellow-700" };
//     if (a.includes("pending"))
//       return { icon: "⏳", bg: "bg-orange-50", text: "text-orange-700" };
//     if (a.includes("assigned"))
//       return { icon: "📋", bg: "bg-blue-50", text: "text-blue-700" };
//     if (a.includes("deleted"))
//       return { icon: "🗑️", bg: "bg-red-50", text: "text-red-700" };
//     return { icon: "🧩", bg: "bg-gray-50", text: "text-gray-700" };
//   };

//   // Pagination
//   const indexOfLastLog = currentPage * logsPerPage;
//   const indexOfFirstLog = indexOfLastLog - logsPerPage;
//   const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
//   const totalPages = Math.ceil(logs.length / logsPerPage);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       {/* Header */}
//       <header className="bg-white border-b shadow-sm sticky top-0 z-10">
//         <div className="flex items-center justify-between px-12 py-4">
//           <div className="flex items-center space-x-3">
//             <img src="/logo.png" alt="Clean Street" className="w-10 h-10 object-contain" />
//             <h1 className="text-2xl font-bold text-black">Clean Street</h1>
//           </div>
//           <nav className="flex gap-10 text-gray-700 font-medium">
//             {[
//               { path: "/dashboard", label: "Dashboard" },
//               { path: "/report", label: "Report Issue" },
//               { path: "/complaints", label: "Complaints" },
//               { path: "/admin-logs", label: "Admin Logs" },
//             ].map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`${
//                   isActive(link.path)
//                     ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
//                     : "hover:text-blue-600"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="px-12 py-10">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
//             🧾 Admin Logs
//           </h2>
//           <div className="flex items-center gap-2">
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//             </span>
//             <span className="text-sm text-gray-600">Live</span>
//           </div>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-500 mt-16 animate-pulse text-lg">Loading logs...</p>
//         ) : logs.length === 0 ? (
//           <p className="text-center text-gray-500 mt-16 text-lg">No admin activity recorded yet.</p>
//         ) : (
//           <>
//             <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 w-full max-h-[60vh] overflow-y-auto">
//             <ul className="space-y-4">
//   {currentLogs.map((log) => {
//     const { icon, bg, text } = getLogStyle(log.action);
//     return (
//       <li
//         key={log._id}
//         className={`flex items-center justify-between p-4 rounded-xl ${bg} hover:shadow-md transition duration-200`}
//       >
//         {/* Left: icon + message */}
//         <div className="flex items-start gap-4">
//           <div className="text-2xl mt-1">{icon}</div>
//           <p className={`text-base font-medium ${text}`}>
//             <b>{log.adminName}</b> {log.action}{" "}
//             {log.volunteerName && log.volunteerName !== "N/A" ? `to ${log.volunteerName}` : ""}
//           </p>
//         </div>

//         {/* Right: timestamp */}
//         <span className="text-xs text-gray-500 whitespace-nowrap">
//           {formatTime(log.createdAt)}
//         </span>
//       </li>
//     );
//   })}
// </ul>

//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center items-center gap-4 mt-6">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               <span className="text-gray-700 font-medium">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";

// // Connect to Socket.IO
// const socket = io(import.meta.env.VITE_SOCKET_URL, {
//   transports: ["websocket"],
//   reconnectionAttempts: 5,
//   reconnectionDelay: 1000,
// });

// export default function AdminLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const logsPerPage = 10; // 10 logs per page
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/complaints/admin/logs`
//         );
//         console.log("Fetched logs:", res.data); // Check API data structure
//         setLogs(res.data || []);
//       } catch (err) {
//         console.error("Error fetching logs:", err);
//         setLogs([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();

//     // Listen for live logs
//     socket.on("newAdminLog", (newLog) => {
//       setLogs((prev) => [newLog, ...prev]);
//     });

//     return () => socket.off("newAdminLog");
//   }, []);

//   const formatTime = (isoTime) =>
//     isoTime
//       ? new Date(isoTime).toLocaleString("en-IN", {
//           dateStyle: "medium",
//           timeStyle: "short",
//         })
//       : "No time";

//   const getLogStyle = (action) => {
//     const a = action?.toLowerCase() || "";
//     if (a.includes("resolved"))
//       return { icon: "✅", bg: "bg-green-50", text: "text-green-700" };
//     if (a.includes("in progress") || a.includes("updated status"))
//       return { icon: "🔄", bg: "bg-yellow-50", text: "text-yellow-700" };
//     if (a.includes("pending"))
//       return { icon: "⏳", bg: "bg-orange-50", text: "text-orange-700" };
//     if (a.includes("assigned"))
//       return { icon: "📋", bg: "bg-blue-50", text: "text-blue-700" };
//     if (a.includes("deleted"))
//       return { icon: "🗑️", bg: "bg-red-50", text: "text-red-700" };
//     return { icon: "🧩", bg: "bg-gray-50", text: "text-gray-700" };
//   };

//   // Pagination calculations
//   const indexOfLastLog = currentPage * logsPerPage;
//   const indexOfFirstLog = indexOfLastLog - logsPerPage;
//   const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
//   const totalPages = Math.ceil(logs.length / logsPerPage);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       {/* Header */}
//       <header className="bg-white border-b shadow-sm sticky top-0 z-10">
//         <div className="flex items-center justify-between px-12 py-4">
//           <div className="flex items-center space-x-3">
//             <img src="/logo.png" alt="Clean Street" className="w-10 h-10 object-contain" />
//             <h1 className="text-2xl font-bold text-black">Clean Street</h1>
//           </div>
//           <nav className="flex gap-10 text-gray-700 font-medium">
//             {[
//               { path: "/dashboard", label: "Dashboard" },
//               { path: "/report", label: "Report Issue" },
//               { path: "/complaints", label: "Complaints" },
//               { path: "/admin-logs", label: "Admin Logs" },
//             ].map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`${isActive(link.path)
//                   ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
//                   : "hover:text-blue-600"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="px-12 py-10">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
//             🧾 Admin Logs
//           </h2>
//           <div className="flex items-center gap-2">
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//             </span>
//             <span className="text-sm text-gray-600">Live</span>
//           </div>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-500 mt-16 animate-pulse text-lg">Loading logs...</p>
//         ) : logs.length === 0 ? (
//           <p className="text-center text-gray-500 mt-16 text-lg">No admin activity recorded yet.</p>
//         ) : (
//           <>
//             <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 w-full max-h-[60vh] overflow-y-auto">
//               <ul className="space-y-4">
//                 {currentLogs.map((log) => {
//                   const { icon, bg, text } = getLogStyle(log.action);
//                   return (
//                     <li
//                       key={log._id}
//                       className={`flex items-center justify-between gap-4 p-4 rounded-xl ${bg} hover:shadow-md transition duration-200`}
//                     >
//                       <div className="flex items-start gap-4">
//                         <div className="text-2xl">{icon}</div>
//                         <div className="flex flex-col">
//                           <p className={`text-base font-medium ${text}`}>
//                             <b>{log.adminName}</b>{" "}
//                             {log.action === "assigned"
//                               ? `assigned "${log.complaintTitle}" to ${log.volunteerName}`
//                               : log.action === "updated status"
//                               ? `updated "${log.complaintTitle}" status to ${log.status}`
//                               : log.action}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="text-xs text-gray-500 whitespace-nowrap">
//                         {formatTime(log.createdAt)}
//                       </div>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center items-center gap-4 mt-6">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               <span className="text-gray-700 font-medium">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";

// // Connect to Socket.IO
// const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
//   transports: ["websocket"],
//   reconnectionAttempts: 5,
//   reconnectionDelay: 1000,
// });

// export default function AdminLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const logsPerPage = 10;
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/complaints/admin/logs`);
//         setLogs(res.data || []);
//       } catch (err) {
//         console.error(err);
//         setLogs([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();

//     socket.on("newAdminLog", (newLog) => {
//       setLogs((prev) => [newLog, ...prev]);
//     });

//     return () => socket.off("newAdminLog");
//   }, []);

//   const formatTime = (isoTime) =>
//     isoTime
//       ? new Date(isoTime).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
//       : "";

//   const getLogStyle = (action) => {
//     const a = action?.toLowerCase() || "";
//     if (a.includes("resolved")) return { icon: "✅", bg: "bg-green-50", text: "text-green-700" };
//     if (a.includes("in progress") || a.includes("updated status")) return { icon: "🔄", bg: "bg-yellow-50", text: "text-yellow-700" };
//     if (a.includes("pending")) return { icon: "⏳", bg: "bg-orange-50", text: "text-orange-700" };
//     if (a.includes("assigned")) return { icon: "📋", bg: "bg-blue-50", text: "text-blue-700" };
//     if (a.includes("deleted")) return { icon: "🗑️", bg: "bg-red-50", text: "text-red-700" };
//     return { icon: "🧩", bg: "bg-gray-50", text: "text-gray-700" };
//   };

//   const indexOfLastLog = currentPage * logsPerPage;
//   const indexOfFirstLog = indexOfLastLog - logsPerPage;
//   const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
//   const totalPages = Math.ceil(logs.length / logsPerPage);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       {/* Header */}
//       <header className="bg-white border-b shadow-sm sticky top-0 z-10">
//         <div className="flex items-center justify-between px-12 py-4">
//           <div className="flex items-center space-x-3">
//             <img src="/logo.png" alt="Clean Street" className="w-10 h-10 object-contain" />
//             <h1 className="text-2xl font-bold text-black">Clean Street</h1>
//           </div>
//           <nav className="flex gap-10 text-gray-700 font-medium">
//             {[{ path: "/dashboard", label: "Dashboard" },
//               { path: "/report", label: "Report Issue" },
//               { path: "/complaints", label: "Complaints" },
//               { path: "/admin-logs", label: "Admin Logs" }].map(link => (
//               <Link key={link.path} to={link.path} className={`${isActive(link.path) ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1" : "hover:text-blue-600"}`}>
//                 {link.label}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       </header>

//       <main className="px-12 py-10">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
//             🧾 Admin Logs
//           </h2>
//           <div className="flex items-center gap-2">
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//             </span>
//             <span className="text-sm text-gray-600">Live</span>
//           </div>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-500 mt-16 animate-pulse text-lg">Loading logs...</p>
//         ) : logs.length === 0 ? (
//           <p className="text-center text-gray-500 mt-16 text-lg">No admin activity recorded yet.</p>
//         ) : (
//           <>
//             <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 w-full max-h-[60vh] overflow-y-auto">
//               <ul className="space-y-4">
//                 {currentLogs.map(log => {
//                   const { icon, bg, text } = getLogStyle(log.action);
//                   return (
//                     <li key={log._id} className={`flex justify-between items-center p-4 rounded-xl ${bg} hover:shadow-md transition duration-200`}>
//                       <div className="flex items-start gap-4">
//                         <div className="text-2xl">{icon}</div>
//                         <div className="flex flex-col">
//                           <p className={`text-base font-medium ${text}`}>
//                             <b>{log.adminName}</b> {log.action}{" "}
//                             {log.complaintTitle ? `"${log.complaintTitle}"` : ""}
//                             {log.volunteerName && log.volunteerName !== "N/A" ? ` to ${log.volunteerName}` : ""}
//                           </p>
//                         </div>
//                       </div>
//                       <span className="text-xs text-gray-500">{formatTime(log.createdAt)}</span>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center items-center gap-4 mt-6">
//               <button
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               <span className="text-gray-700 font-medium">Page {currentPage} of {totalPages}</span>
//               <button
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";

// // Socket connection
// const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
//   transports: ["websocket"],
//   reconnectionAttempts: 5,
//   reconnectionDelay: 1000,
// });

// export default function AdminLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const logsPerPage = 10;
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/complaints/admin/logs`);
//         setLogs(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch logs:", err);
//         setLogs([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();

//     // Socket listener for live updates
//     socket.on("newAdminLog", (newLog) => {
//       setLogs((prev) => [newLog, ...prev]);
//     });

//     return () => socket.off("newAdminLog");
//   }, []);

//   const formatTime = (isoTime) =>
//     isoTime
//       ? new Date(isoTime).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
//       : "";

//   const getLogStyle = (action) => {
//     const a = action?.toLowerCase() || "";
//     if (a.includes("resolved")) return { icon: "✅", bg: "bg-green-50", text: "text-green-700" };
//     if (a.includes("in progress") || a.includes("updated status")) return { icon: "🔄", bg: "bg-yellow-50", text: "text-yellow-700" };
//     if (a.includes("pending")) return { icon: "⏳", bg: "bg-orange-50", text: "text-orange-700" };
//     if (a.includes("assigned")) return { icon: "📋", bg: "bg-blue-50", text: "text-blue-700" };
//     if (a.includes("deleted")) return { icon: "🗑️", bg: "bg-red-50", text: "text-red-700" };
//     return { icon: "🧩", bg: "bg-gray-50", text: "text-gray-700" };
//   };

//   // Pagination
//   const indexOfLastLog = currentPage * logsPerPage;
//   const indexOfFirstLog = indexOfLastLog - logsPerPage;
//   const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
//   const totalPages = Math.ceil(logs.length / logsPerPage);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       {/* Header */}
//       <header className="bg-white border-b shadow-sm sticky top-0 z-10">
//         <div className="flex items-center justify-between px-12 py-4">
//           <div className="flex items-center space-x-3">
//             <img src="/logo.png" alt="Clean Street" className="w-10 h-10 object-contain" />
//             <h1 className="text-2xl font-bold text-black">Clean Street</h1>
//           </div>
//           <nav className="flex gap-10 text-gray-700 font-medium">
//             {[
//               { path: "/dashboard", label: "Dashboard" },
//               { path: "/report", label: "Report Issue" },
//               { path: "/complaints", label: "Complaints" },
//               { path: "/admin-logs", label: "Admin Logs" },
//             ].map(link => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`${isActive(link.path) ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1" : "hover:text-blue-600"}`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       </header>

//       <main className="px-12 py-10">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">🧾 Admin Logs</h2>
//           <div className="flex items-center gap-2">
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//             </span>
//             <span className="text-sm text-gray-600">Live</span>
//           </div>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-500 mt-16 animate-pulse text-lg">Loading logs...</p>
//         ) : logs.length === 0 ? (
//           <p className="text-center text-gray-500 mt-16 text-lg">No admin activity recorded yet.</p>
//         ) : (
//           <>
//             <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 w-full max-h-[60vh] overflow-y-auto">
//               <ul className="space-y-4">
//                 {currentLogs.map(log => {
//                   const { icon, bg, text } = getLogStyle(log.action);
//                   return (
//                     <li key={log._id} className={`flex justify-between items-center p-4 rounded-xl ${bg} hover:shadow-md transition duration-200`}>
//                       <div className="flex items-start gap-4">
//                         <div className="text-2xl">{icon}</div>
//                         <div className="flex flex-col">
//                           <p className={`text-base font-medium ${text}`}>
//                             <b>{log.adminName}</b> {log.action}{" "}
//                             {log.complaintTitle ? `"${log.complaintTitle}"` : ""}
//                             {log.volunteerName && log.volunteerName !== "N/A" ? ` to ${log.volunteerName}` : ""}
//                           </p>
//                         </div>
//                       </div>
//                       <span className="text-xs text-gray-500">{formatTime(log.createdAt)}</span>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center items-center gap-4 mt-6">
//               <button
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               <span className="text-gray-700 font-medium">Page {currentPage} of {totalPages}</span>
//               <button
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }

//work final
// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";
// import { io } from "socket.io-client";

// export default function AdminLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const logsPerPage = 10;
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   useEffect(() => {
//     // 1️⃣ Fetch logs via Axios with cookie JWT
//     const fetchLogs = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/complaints/admin/logs`,
//           { withCredentials: true } // ✅ send httpOnly cookie automatically
//         );
//         setLogs(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch logs:", err);
//         setLogs([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();

//     // 2️⃣ Socket.IO connection with cookie support
//     const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
//        transports: ["websocket"],
//       withCredentials: true, // ✅ send cookie automatically
//     });

//     socket.on("connect_error", (err) => {
//       console.error("Socket.IO connection error:", err.message);
//     });

//     socket.on("newAdminLog", (newLog) => {
//       setLogs((prev) => [newLog, ...prev]);
//     });

//     return () => socket.disconnect();
//   }, []);

//   // Format timestamp
//   const formatTime = (isoTime) =>
//     isoTime
//       ? new Date(isoTime).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
//       : "";

//   // Style log based on action
//   const getLogStyle = (action) => {
//     const a = action?.toLowerCase() || "";
//     if (a.includes("resolved")) return { icon: "✅", bg: "bg-green-50", text: "text-green-700" };
//     if (a.includes("in progress") || a.includes("updated status")) return { icon: "🔄", bg: "bg-yellow-50", text: "text-yellow-700" };
//     if (a.includes("pending")) return { icon: "⏳", bg: "bg-orange-50", text: "text-orange-700" };
//     if (a.includes("assigned")) return { icon: "📋", bg: "bg-blue-50", text: "text-blue-700" };
//     if (a.includes("deleted")) return { icon: "🗑️", bg: "bg-red-50", text: "text-red-700" };
//     return { icon: "🧩", bg: "bg-gray-50", text: "text-gray-700" };
//   };

//   // Pagination logic
//   const indexOfLastLog = currentPage * logsPerPage;
//   const indexOfFirstLog = indexOfLastLog - logsPerPage;
//   const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
//   const totalPages = Math.ceil(logs.length / logsPerPage);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       {/* Header */}
//       <header className="bg-white border-b shadow-sm sticky top-0 z-10">
//         <div className="flex items-center justify-between px-12 py-4">
//           <div className="flex items-center space-x-3">
//             <img src="/logo.png" alt="Clean Street" className="w-10 h-10 object-contain" />
//             <h1 className="text-2xl font-bold text-black">Clean Street</h1>
//           </div>
//           <nav className="flex gap-10 text-gray-700 font-medium">
//             {[{ path: "/dashboard", label: "Dashboard" },
//               { path: "/report", label: "Report Issue" },
//               { path: "/complaints", label: "Complaints" },
//               { path: "/admin-logs", label: "Admin Logs" }].map(link => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`${isActive(link.path) ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1" : "hover:text-blue-600"}`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="px-12 py-10">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">🧾 Admin Logs</h2>
//           <div className="flex items-center gap-2">
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//             </span>
//             <span className="text-sm text-gray-600">Live</span>
//           </div>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-500 mt-16 animate-pulse text-lg">Loading logs...</p>
//         ) : logs.length === 0 ? (
//           <p className="text-center text-gray-500 mt-16 text-lg">No admin activity recorded yet.</p>
//         ) : (
//           <>
//             <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 w-full max-h-[60vh] overflow-y-auto">
//               <ul className="space-y-4">
//                 {currentLogs.map(log => {
//                   const { icon, bg, text } = getLogStyle(log.action);
//                   return (
//                     <li key={log._id} className={`flex justify-between items-center p-4 rounded-xl ${bg} hover:shadow-md transition duration-200`}>
//                       <div className="flex items-start gap-4">
//                         <div className="text-2xl">{icon}</div>
//                         <div className="flex flex-col">
// <p className={`text-base font-medium ${text}`}>
//   <b>{log.adminName}</b> {log.action}{" "}
//   {log.complaintTitle ? `"${log.complaintTitle}"` : "a complaint"}
//   {log.volunteerName && log.volunteerName !== "N/A" ? ` to ${log.volunteerName}` : ""}
// </p>

                        
//                         </div>
//                       </div>
//                       <span className="text-xs text-gray-500">{formatTime(log.createdAt)}</span>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center items-center gap-4 mt-6">
//               <button
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               <span className="text-gray-700 font-medium">Page {currentPage} of {totalPages}</span>
//               <button
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }


//right side time
// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";
// import { io } from "socket.io-client";

// export default function AdminLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const logsPerPage = 10;
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/complaints/admin/logs`,
//           { withCredentials: true }
//         );
//         setLogs(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch logs:", err);
//         setLogs([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();

//     const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
//       transports: ["websocket"],
//       withCredentials: true,
//     });

//     socket.on("newAdminLog", (newLog) => setLogs((prev) => [newLog, ...prev]));

//     return () => socket.disconnect();
//   }, []);

//   const formatTime = (isoTime) =>
//     isoTime
//       ? new Date(isoTime).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
//       : "";

//   const getLogStyle = (action) => {
//     const a = action?.toLowerCase() || "";
//     if (a.includes("resolved")) return { icon: "✅", bg: "bg-green-50", text: "text-green-800", border: "border-green-400" };
//     if (a.includes("in progress") || a.includes("updated status")) return { icon: "🔄", bg: "bg-yellow-50", text: "text-yellow-800", border: "border-yellow-400" };
//     if (a.includes("pending")) return { icon: "⏳", bg: "bg-orange-50", text: "text-orange-800", border: "border-orange-400" };
//     if (a.includes("assigned")) return { icon: "📋", bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-400" };
//     if (a.includes("deleted")) return { icon: "🗑️", bg: "bg-red-50", text: "text-red-800", border: "border-red-400" };
//     return { icon: "🧩", bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-300" };
//   };

//   const indexOfLastLog = currentPage * logsPerPage;
//   const indexOfFirstLog = indexOfLastLog - logsPerPage;
//   const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
//   const totalPages = Math.ceil(logs.length / logsPerPage);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow sticky top-0 z-20">
//         <div className="flex justify-between items-center px-10 py-4">
//           <div className="flex items-center gap-4">
//             <img src="/logo.png" alt="Clean Street" className="w-10 h-10" />
//             <h1 className="text-2xl font-bold text-gray-900">Clean Street</h1>
//           </div>
//           <nav className="flex gap-8 text-gray-700 font-medium">
//             {[
//               { path: "/dashboard", label: "Dashboard" },
//               { path: "/report", label: "Report Issue" },
//               { path: "/complaints", label: "Complaints" },
//               { path: "/admin-logs", label: "Admin Logs" },
//             ].map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`transition ${isActive(link.path) ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1" : "hover:text-blue-600"}`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="px-10 py-8">
//         <h2 className="text-3xl font-semibold text-gray-800 mb-6">🧾 Admin Logs</h2>

//         {loading ? (
//           <p className="text-center text-gray-500 mt-16 animate-pulse text-lg">Loading logs...</p>
//         ) : logs.length === 0 ? (
//           <p className="text-center text-gray-500 mt-16 text-lg">No admin activity recorded yet.</p>
//         ) : (
//           <>
//             <div className="grid gap-4">
//               {currentLogs.map((log) => {
//                 const { icon, bg, text, border } = getLogStyle(log.action);
//                 return (
//                   <div key={log._id} className={`flex justify-between items-center p-4 rounded-lg shadow hover:shadow-lg transition border-l-4 ${bg} ${border}`}>
//                     {/* Left: Icon & Text */}
//                     <div className="flex items-center gap-4">
//                       <span className="text-2xl">{icon}</span>
//                       <div className="flex flex-col">
//                         <p className={`text-gray-800 font-medium ${text}`}>
//                           <b>{log.adminName}</b> {log.action}{" "}
//                           {log.complaintTitle ? `"${log.complaintTitle}"` : "a complaint"}
//                           {log.volunteerName && log.volunteerName !== "N/A" ? ` to ${log.volunteerName}` : ""}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Right: Timestamp */}
//                     <div className="text-right text-sm text-gray-500 whitespace-nowrap">
//                       {formatTime(log.createdAt)}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center items-center gap-4 mt-6">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition"
//               >
//                 Previous
//               </button>
//               <span className="text-gray-700 font-medium">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition"
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }

//table
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminLogsTable() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/complaints/admin/logs`, { withCredentials: true });
//         setLogs(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch logs:", err);
//         setLogs([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();
//   }, []);

//   const formatTime = (isoTime) => isoTime ? new Date(isoTime).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "";

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <h1 className="text-2xl font-bold mb-6">Admin Activity Logs</h1>

//       {loading ? (
//         <p className="text-gray-500 animate-pulse">Loading logs...</p>
//       ) : logs.length === 0 ? (
//         <p className="text-gray-500">No admin activity yet.</p>
//       ) : (
//         <div className="overflow-x-auto shadow rounded-lg bg-white">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Admin</th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Action</th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Complaint</th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Volunteer</th>
//                 <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">Timestamp</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {logs.map(log => (
//                 <tr key={log._id} className="hover:bg-gray-50 transition">
//                   <td className="px-6 py-4 text-sm text-gray-800 font-medium">{log.adminName}</td>
//                   <td className="px-6 py-4 text-sm text-gray-700">{log.action}</td>
//                   <td className="px-6 py-4 text-sm text-gray-700">{log.complaintTitle || "-"}</td>
//                   <td className="px-6 py-4 text-sm text-gray-700">{log.volunteerName || "-"}</td>
//                   <td className="px-6 py-4 text-sm text-gray-500 text-right">{formatTime(log.createdAt)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminLogsTable() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const logsPerPage = 10; // Number of logs per page

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/complaints/admin/logs`, {
//           withCredentials: true,
//         });
//         setLogs(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch logs:", err);
//         setLogs([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLogs();
//   }, []);

//   const formatTime = (isoTime) =>
//     isoTime
//       ? new Date(isoTime).toLocaleString("en-IN", {
//           dateStyle: "medium",
//           timeStyle: "short",
//         })
//       : "";

//   // Pagination logic
//   const indexOfLastLog = currentPage * logsPerPage;
//   const indexOfFirstLog = indexOfLastLog - logsPerPage;
//   const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
//   const totalPages = Math.ceil(logs.length / logsPerPage);

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <h1 className="text-2xl font-bold mb-6">Admin Activity Logs</h1>

//       {loading ? (
//         <p className="text-gray-500 animate-pulse">Loading logs...</p>
//       ) : logs.length === 0 ? (
//         <p className="text-gray-500">No admin activity yet.</p>
//       ) : (
//         <>
//           <div className="overflow-x-auto shadow rounded-lg bg-white">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Admin</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Action</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Complaint</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Volunteer</th>
//                   <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">Timestamp</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {currentLogs.map((log) => (
//                   <tr key={log._id} className="hover:bg-gray-50 transition">
//                     <td className="px-6 py-4 text-sm text-gray-800 font-medium">{log.adminName}</td>
//                     <td className={`px-6 py-4 text-sm ${log.action.toLowerCase().includes("assigned") ? "text-blue-600 font-medium" : log.action.toLowerCase().includes("resolved") ? "text-green-600 font-semibold" : "text-gray-700"}`}>
//                       {log.action}
//                     </td>
//                     <td className="px-6 py-4 text-sm font-bold">{log.complaintTitle || "-"}</td>
//                     <td className="px-6 py-4 text-sm text-gray-700">{log.volunteerName || "-"}</td>
//                     <td className="px-6 py-4 text-sm text-gray-500 text-right">{formatTime(log.createdAt)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-center items-center gap-4 mt-4">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <span className="text-gray-700 font-medium">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminLogsTable() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/complaints/admin/logs`, {
          withCredentials: true,
        });
        setLogs(res.data || []);
      } catch (err) {
        console.error("Failed to fetch logs:", err);
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const formatTime = (isoTime) =>
    isoTime
      ? new Date(isoTime).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
      : "";

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(logs.length / logsPerPage);

  // Highlight styles for actions
  const getActionStyle = (action) => {
    if (!action) return "text-black";
    const lower = action.toLowerCase();
    if (lower.includes("assigned")) return "text-blue-600 font-medium";
    if (lower.includes("resolved")) return "text-green-600 font-semibold";
    if (lower.includes("deleted")) return "text-red-600 font-medium";
    if (lower.includes("pending")) return "text-orange-600 font-medium";
    if (lower.includes("in progress")) return "text-yellow-600 font-medium";
    return "text-black";
  };

  // Highlight styles for status
  const getStatusStyle = (status) => {
    if (!status) return "text-black";
    const lower = status.toLowerCase();
    if (lower === "resolved") return "text-green-600 font-semibold";
    if (lower === "assigned") return "text-blue-600 font-medium";
    if (lower === "deleted") return "text-red-600 font-medium";
    if (lower === "pending") return "text-orange-600 font-medium";
    if (lower === "in progress") return "text-yellow-600 font-medium";
    return "text-black";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Activity Logs</h1>

      {loading ? (
        <p className="text-gray-500 animate-pulse">Loading logs...</p>
      ) : logs.length === 0 ? (
        <p className="text-gray-500">No admin activity yet.</p>
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
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">Timestamp</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentLogs.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">{log.adminName}</td>
                    <td className={`px-6 py-4 text-sm ${getActionStyle(log.action)}`}>{log.action}</td>
                    <td className="px-6 py-4 text-sm font-semibold">{log.complaintTitle || "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{log.volunteerName || "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 text-right">{formatTime(log.createdAt)}</td>
                    <td className={`px-6 py-4 text-sm ${getStatusStyle(log.status)}`}>{log.status || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
