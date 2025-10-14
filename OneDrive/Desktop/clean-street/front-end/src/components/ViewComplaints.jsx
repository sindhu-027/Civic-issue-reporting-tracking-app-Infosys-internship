// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function ViewComplaints() {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         // ✅ Step 1: Get logged-in user info
//         const userRes = await axios.get("http://localhost:5000/api/auth/profile", {
//           withCredentials: true,
//         });
//         setUser(userRes.data);

//         // ✅ Step 2: Fetch complaints based on role
//         let apiUrl = "http://localhost:5000/api/complaints/my"; // default for normal user

//         if (userRes.data.role === "admin") {
//           apiUrl = "http://localhost:5000/api/complaints/all";
//         } else if (userRes.data.role === "volunteer") {
//           apiUrl = "http://localhost:5000/api/complaints/nearby";
//         }

//         const res = await axios.get(apiUrl, { withCredentials: true });
//         setComplaints(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("⚠️ Failed to load complaints. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchComplaints();
//   }, []);

//   if (loading)
//     return (
//       <div className="text-center mt-20 text-gray-500 text-lg">
//         Loading complaints...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="text-center mt-20 text-red-500 text-lg">{error}</div>
//     );

//   if (complaints.length === 0)
//     return (
//       <div className="text-center mt-20 text-gray-500 text-lg">
//         No complaints found for your area.
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Navbar */}
//       <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-xl mb-6">
//         <h1 className="text-xl font-bold text-green-700">Clean Street</h1>
//         <div className="flex gap-4">
//           <button
//             onClick={() => (window.location.href = "/dashboard")}
//             className="text-gray-700 hover:text-green-600 font-semibold"
//           >
//             Dashboard
//           </button>
//           <button
//             onClick={() => (window.location.href = "/report")}
//             className="text-gray-700 hover:text-green-600 font-semibold"
//           >
//             Report Issue
//           </button>
//           <button
//             onClick={() => (window.location.href = "/profile")}
//             className="text-gray-700 hover:text-green-600 font-semibold"
//           >
//             Profile
//           </button>
//         </div>
//       </div>

//       {/* Complaints Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {complaints.map((c) => (
//           <div
//             key={c._id}
//             className="bg-white rounded-xl shadow-md p-4 transition-transform transform hover:scale-[1.02]"
//           >
//             <div className="w-full h-48 mb-3">
//               {c.photo ? (
//                 <img
//                   src={
//                     c.photo.startsWith("http")
//                       ? c.photo
//                       : `http://localhost:5000/${c.photo}`
//                   }
//                   alt="Complaint"
//                   className="w-full h-full object-cover rounded-lg"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = "/no-image.png";
//                   }}
//                 />
//               ) : (
//                 <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
//                   No image
//                 </div>
//               )}
//             </div>

//             <h2 className="text-lg font-bold text-gray-800 mb-2">
//               {c.title || "Untitled Complaint"}
//             </h2>
//             <p className="text-gray-600 text-sm mb-2">{c.description}</p>

//             <div className="flex flex-col text-sm text-gray-500 mb-3">
//               <span>
//                 📍 <strong>Address:</strong> {c.address || "N/A"}
//               </span>
//               <span>
//                 🗓️ <strong>Date:</strong>{" "}
//                 {c.createdAt
//                   ? new Date(c.createdAt).toLocaleDateString()
//                   : c.created_at
//                   ? new Date(c.created_at).toLocaleDateString()
//                   : "N/A"}
//               </span>

//               <span>
//                 ⚙️ <strong>Status:</strong>{" "}
//                 <span
//                   className={`font-semibold ${
//                     c.status === "resolved"
//                       ? "text-green-600"
//                       : c.status === "in_progress"
//                       ? "text-yellow-600"
//                       : "text-gray-700"
//                   }`}
//                 >
//                   {c.status}
//                 </span>
//               </span>
//             </div>

//             {c.assigned_to && (
//               <p className="text-sm text-gray-500">
//                 👷 Assigned to: {c.assigned_to}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


//view 

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function ViewComplaints() {
//   const [complaints, setComplaints] = useState([]);
//   const [selectedComplaint, setSelectedComplaint] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ✅ Fetch all complaints (for all roles)
//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/complaints/all", {
//           withCredentials: true,
//         });
//         setComplaints(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("⚠️ Failed to load complaints. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchComplaints();
//   }, []);

//   if (loading)
//     return <div className="text-center mt-20 text-gray-500 text-lg">Loading complaints...</div>;

//   if (error)
//     return <div className="text-center mt-20 text-red-500 text-lg">{error}</div>;

//   if (complaints.length === 0)
//     return <div className="text-center mt-20 text-gray-500 text-lg">No complaints found.</div>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Navbar */}
//       <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-xl mb-6">
//         <h1 className="text-xl font-bold text-green-700">Clean Street</h1>
//         <div className="flex gap-4">
//           <button
//             onClick={() => (window.location.href = "/dashboard")}
//             className="text-gray-700 hover:text-green-600 font-semibold"
//           >
//             Dashboard
//           </button>
//           <button
//             onClick={() => (window.location.href = "/report")}
//             className="text-gray-700 hover:text-green-600 font-semibold"
//           >
//             Report Issue
//           </button>
//           <button
//             onClick={() => (window.location.href = "/profile")}
//             className="text-gray-700 hover:text-green-600 font-semibold"
//           >
//             Profile
//           </button>
//         </div>
//       </div>

//       {/* Complaints Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {complaints.map((c) => (
//           <div
//             key={c._id}
//             className="bg-white rounded-xl shadow-md p-4 transition-transform transform hover:scale-[1.02]"
//           >
//             <div className="w-full h-48 mb-3">
//               {c.photo ? (
//                 <img
//                   src={
//                     c.photo.startsWith("http")
//                       ? c.photo
//                       : `http://localhost:5000/${c.photo}`
//                   }
//                   alt="Complaint"
//                   className="w-full h-full object-cover rounded-lg"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = "/no-image.png";
//                   }}
//                 />
//               ) : (
//                 <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
//                   No image
//                 </div>
//               )}
//             </div>

//             <h2 className="text-lg font-bold text-gray-800 mb-2">
//               {c.title || "Untitled Complaint"}
//             </h2>
//             <p className="text-gray-600 text-sm mb-2 line-clamp-2">
//               {c.description || "No description"}
//             </p>

//             <div className="flex flex-col text-sm text-gray-500 mb-3">
//               <span>📍 <strong>Address:</strong> {c.address || "N/A"}</span>
//               <span>
//                 🗓️ <strong>Date:</strong>{" "}
//                 {new Date(c.createdAt || c.created_at).toLocaleDateString()}
//               </span>
//               <span>
//                 ⚙️ <strong>Status:</strong>{" "}
//                 <span
//                   className={`font-semibold ${
//                     c.status === "resolved"
//                       ? "text-green-600"
//                       : c.status === "in_progress"
//                       ? "text-yellow-600"
//                       : "text-gray-700"
//                   }`}
//                 >
//                   {c.status}
//                 </span>
//               </span>
//             </div>

//             {c.assignedVolunteer && (
//               <p className="text-sm text-gray-500 mb-2">
//                 👷 Assigned to: {c.assignedVolunteer.fullName || c.assignedVolunteer.username}
//               </p>
//             )}

//             <button
//               onClick={() => setSelectedComplaint(c)}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 rounded-lg"
//             >
//               View
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* 🟢 Complaint Details Modal */}
//       {selectedComplaint && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
//             <button
//               onClick={() => setSelectedComplaint(null)}
//               className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl"
//             >
//               ✕
//             </button>

//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">
//               {selectedComplaint.title}
//             </h2>

//             {selectedComplaint.photo && (
//               <img
//                 src={
//                   selectedComplaint.photo.startsWith("http")
//                     ? selectedComplaint.photo
//                     : `http://localhost:5000/${selectedComplaint.photo}`
//                 }
//                 alt="Complaint"
//                 className="w-full h-56 object-cover rounded-lg mb-3"
//               />
//             )}

//             <p className="text-gray-700 mb-3">{selectedComplaint.description}</p>
//             <p className="text-gray-600 text-sm mb-1">
//               📍 <strong>Address:</strong> {selectedComplaint.address}
//             </p>
//             {selectedComplaint.landmark && (
//               <p className="text-gray-600 text-sm mb-1">
//                 🏙️ <strong>Landmark:</strong> {selectedComplaint.landmark}
//               </p>
//             )}
//             <p className="text-gray-600 text-sm mb-1">
//               ⚙️ <strong>Status:</strong> {selectedComplaint.status}
//             </p>
//             <p className="text-gray-600 text-sm mb-1">
//               👷 <strong>Assigned Volunteer:</strong>{" "}
//               {selectedComplaint.assignedVolunteer
//                 ? selectedComplaint.assignedVolunteer.fullName ||
//                   selectedComplaint.assignedVolunteer.username
//                 : "Not Assigned"}
//             </p>
//             <p className="text-gray-600 text-sm">
//               🗓️ <strong>Date:</strong>{" "}
//               {new Date(selectedComplaint.createdAt).toLocaleDateString()}
//             </p>

//             <div className="mt-4 border-t pt-3">
//               <h3 className="text-md font-semibold text-gray-800 mb-2">Comments & Votes</h3>
//               <p className="text-sm text-gray-500">💬 Coming soon...</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


//vote 

import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [voting, setVoting] = useState(false);

  // ✅ Fetch all complaints
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/complaints/all", {
          withCredentials: true,
        });
        setComplaints(res.data);
      } catch (err) {
        console.error(err);
        setError("⚠️ Failed to load complaints. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const handleVote = async (id, type) => {
    try {
      setVoting(true);
      await axios.post(
        `http://localhost:5000/api/complaints/vote/${id}`,
        { type },
        { withCredentials: true }
      );
      const res = await axios.get("http://localhost:5000/api/complaints/all", {
        withCredentials: true,
      });
      setComplaints(res.data);
      const updated = res.data.find((c) => c._id === selectedComplaint._id);
      setSelectedComplaint(updated);
    } catch (err) {
      console.error("Vote failed:", err);
    } finally {
      setVoting(false);
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) return;
    try {
      await axios.post(
        `http://localhost:5000/api/complaints/comment/${selectedComplaint._id}`,
        { text: comment },
        { withCredentials: true }
      );
      const res = await axios.get("http://localhost:5000/api/complaints/all", {
        withCredentials: true,
      });
      setComplaints(res.data);
      const updated = res.data.find((c) => c._id === selectedComplaint._id);
      setSelectedComplaint(updated);
      setComment("");
    } catch (err) {
      console.error("Comment failed:", err);
    }
  };

  if (loading)
    return <div className="text-center mt-20 text-gray-500 text-lg">Loading complaints...</div>;

  if (error)
    return <div className="text-center mt-20 text-red-500 text-lg">{error}</div>;

  if (complaints.length === 0)
    return <div className="text-center mt-20 text-gray-500 text-lg">No complaints found.</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-xl mb-6">
        <h1 className="text-xl font-bold text-green-700">Clean Street</h1>
        <div className="flex gap-4">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="text-gray-700 hover:text-green-600 font-semibold"
          >
            Dashboard
          </button>
          <button
            onClick={() => (window.location.href = "/report")}
            className="text-gray-700 hover:text-green-600 font-semibold"
          >
            Report Issue
          </button>
          <button
            onClick={() => (window.location.href = "/profile")}
            className="text-gray-700 hover:text-green-600 font-semibold"
          >
            Profile
          </button>
        </div>
      </div>

      {/* Complaints Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {complaints.map((c) => (
          <div
            key={c._id}
            className="bg-white rounded-xl shadow-md p-4 transition-transform transform hover:scale-[1.02]"
          >
            <div className="w-full h-48 mb-3">
              {c.photo ? (
                <img
                  src={
                    c.photo.startsWith("http")
                      ? c.photo
                      : `http://localhost:5000/${c.photo}`
                  }
                  alt="Complaint"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  No image
                </div>
              )}
            </div>

            <h2 className="text-lg font-bold text-gray-800 mb-2">
              {c.title || "Untitled Complaint"}
            </h2>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {c.description || "No description"}
            </p>

            <div className="flex flex-col text-sm text-gray-500 mb-3">
              <span>📍 <strong>Address:</strong> {c.address || "N/A"}</span>
              <span>
                🗓️ <strong>Date:</strong>{" "}
                {new Date(c.createdAt || c.created_at).toLocaleDateString()}
              </span>
              <span>
                ⚙️ <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    c.status === "completed"
                      ? "text-green-600"
                      : c.status === "in_progress"
                      ? "text-yellow-600"
                      : "text-gray-700"
                  }`}
                >
                  {c.status}
                </span>
              </span>
            </div>

            {c.assignedVolunteer && (
              <p className="text-sm text-gray-500 mb-2">
                👷 Assigned to: {c.assignedVolunteer.fullName || c.assignedVolunteer.username}
              </p>
            )}

            <button
              onClick={() => setSelectedComplaint(c)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 rounded-lg"
            >
              View
            </button>
          </div>
        ))}
      </div>

      {/* 🟢 Complaint Details Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedComplaint(null)}
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              {selectedComplaint.title}
            </h2>

            {selectedComplaint.photo && (
              <img
                src={
                  selectedComplaint.photo.startsWith("http")
                    ? selectedComplaint.photo
                    : `http://localhost:5000/${selectedComplaint.photo}`
                }
                alt="Complaint"
                className="w-full h-56 object-cover rounded-lg mb-3"
              />
            )}

            <p className="text-gray-700 mb-3">{selectedComplaint.description}</p>

            {/* 🚦 Status Tracking Line */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Reported</span>
                <span>In Progress</span>
                <span>Completed</span>
              </div>
              <div className="w-full bg-gray-300 h-2 rounded-full">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    selectedComplaint.status === "completed"
                      ? "bg-green-500 w-full"
                      : selectedComplaint.status === "in_progress"
                      ? "bg-yellow-400 w-1/2"
                      : "bg-gray-400 w-1/4"
                  }`}
                ></div>
              </div>
            </div>

            {/* Votes */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => handleVote(selectedComplaint._id, "upvote")}
                disabled={voting}
                className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                👍 {selectedComplaint.upvotes?.length || 0}
              </button>
              <button
                onClick={() => handleVote(selectedComplaint._id, "downvote")}
                disabled={voting}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                👎 {selectedComplaint.downvotes?.length || 0}
              </button>
            </div>

            {/* Comments */}
            <div>
              <h3 className="font-semibold mb-2 text-gray-700">Comments</h3>
              <div className="max-h-32 overflow-y-auto bg-gray-50 p-2 rounded-lg">
                {selectedComplaint.comments?.length > 0 ? (
                  selectedComplaint.comments.map((com, idx) => (
                    <p
                      key={idx}
                      className="text-sm text-gray-600 border-b border-gray-200 py-1"
                    >
                      💬 {com.text}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">No comments yet</p>
                )}
              </div>

              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-grow border rounded-lg px-3 py-1.5 text-sm focus:outline-none"
                />
                <button
                  onClick={handleComment}
                  className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
