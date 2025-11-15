
import { useEffect, useState } from "react";
import api from "../api/axios"; // centralized axios instance (baseURL -> /api)

export default function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [voting, setVoting] = useState(false);
  const [postingComment, setPostingComment] = useState(false);

  // ✅ Fetch all complaints
  const fetchAll = async () => {
    try {
      const res = await api.get("/complaints/all");
      setComplaints(res.data || []);
    } catch (err) {
      console.error("Fetch complaints error:", err);
      setError("⚠️ Failed to load complaints. Please try again later.");
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchAll();
      setLoading(false);
    })();
  }, []);

  // ✅ Fetch single complaint
  const fetchComplaintById = async (id) => {
    try {
      const res = await api.get("/complaints/all");
      const found = res.data?.find((c) => c._id === id);
      return found || null;
    } catch (err) {
      console.error("Fetch single complaint error:", err);
      return null;
    }
  };

  // // ✅ Handle Upvote / Downvote (fixed endpoints)
  // const handleVote = async (id, type) => {
  //   try {
  //     setVoting(true);
  //     if (type === "up") {
  //       await api.post(`/complaints/${id}/upvote`);
  //     } else {
  //       await api.post(`/complaints/${id}/downvote`);
  //     }

  //     await fetchAll();
  //     if (selectedComplaint && selectedComplaint._id === id) {
  //       const updated = await fetchComplaintById(id);
  //       setSelectedComplaint(updated);
  //     }
  //   } catch (err) {
  //     console.error("Vote failed:", err);
  //   } finally {
  //     setVoting(false);
  //   }
  // };
// ✅ Corrected handleVote (for separate routes)
const handleVote = async (id, type) => {
  try {
    setVoting(true);
    const endpoint = type === "up" ? "upvote" : "downvote";
    await api.post(`/complaints/${id}/${endpoint}`);
    await fetchAll();
    if (selectedComplaint && selectedComplaint._id === id) {
      const updated = await fetchComplaintById(id);
      setSelectedComplaint(updated);
    }
  } catch (err) {
    console.error("Vote failed:", err);
  } finally {
    setVoting(false);
  }
};

  // ✅ Handle Comment
  const handleComment = async () => {
    if (!selectedComplaint || !comment.trim()) return;
    try {
      setPostingComment(true);
      await api.post(`/complaints/${selectedComplaint._id}/comment`, {
        text: comment.trim(),
      });
      await fetchAll();
      const updated = await fetchComplaintById(selectedComplaint._id);
      setSelectedComplaint(updated);
      setComment("");
    } catch (err) {
      console.error("Comment failed:", err);
    } finally {
      setPostingComment(false);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        Loading complaints...
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-20 text-red-500 text-lg">{error}</div>
    );

  if (complaints.length === 0)
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        No complaints found.
      </div>
    );

  const statusClass = (s) => {
    if (!s) return "text-gray-700";
    if (s === "Resolved") return "text-green-600";
    if (s === "In Progress") return "text-yellow-600";
    if (s === "Assigned") return "text-indigo-600";
    return "text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* ✅ Navbar */}
      {/* <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-xl mb-6">
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
      </div> */}
      {/* ✅ Navbar with logo */}
<div className="flex justify-between items-center bg-white shadow-md p-4 rounded-xl mb-6">
  <div className="flex items-center gap-3">
    <img
      src="/logo.png"
      alt="Clean Street Logo"
      className="w-10 h-10 rounded-full object-cover"
    />
    <h1 className="text-2xl font-bold text-black tracking-wide">
      Clean Street
    </h1>
  </div>

  <div className="flex gap-6">
    <button
      onClick={() => (window.location.href = "/dashboard")}
      className="text-gray-800 hover:text-blue-600 font-semibold transition-colors"
    >
      Dashboard
    </button>
    <button
      onClick={() => (window.location.href = "/report")}
      className="text-gray-800 hover:text-blue-600 font-semibold transition-colors"
    >
      Report Issue
    </button>
    <button
      onClick={() => (window.location.href = "/profile")}
      className="text-gray-800 hover:text-blue-600 font-semibold transition-colors"
    >
      Profile
    </button>
  </div>
</div>


      {/* ✅ Complaints Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {complaints.map((c) => (
          <div
            key={c._id}
            className="bg-white rounded-xl shadow-md p-4 transition-transform transform hover:scale-[1.02]"
          >
            {/* ✅ Show one image */}
            <div className="w-full h-48 mb-3">
              {Array.isArray(c.photos) && c.photos.length > 0 ? (
                <img
                  src={
                    c.photos[0].startsWith("http")
                      ? c.photos[0]
                      : `${import.meta.env.VITE_API_URL}/${c.photos[0]}`
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
              <span>
                📍 <strong>Address:</strong> {c.location || c.address || "N/A"}
              </span>
              <span>
                🗓️ <strong>Date:</strong>{" "}
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
              <span>
                ⚙️ <strong>Status:</strong>{" "}
                <span className={`font-semibold ${statusClass(c.status)}`}>
                  {c.status || "Pending"}
                </span>
              </span>
            </div>

            {c.volunteer && (
              <p className="text-sm text-gray-500 mb-2">
                👷 Assigned to: {c.volunteer.username || "Volunteer"}
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

      {/* ✅ Complaint Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedComplaint(null)}
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              {selectedComplaint.title}
            </h2>

            {/* ✅ Show all photos */}
            {Array.isArray(selectedComplaint.photos) &&
            selectedComplaint.photos.length > 0 ? (
              <div className="mb-3 grid grid-cols-1 gap-2">
                {selectedComplaint.photos.map((p, i) => (
                  <img
                    key={i}
                    src={
                      p.startsWith("http")
                        ? p
                        : `${import.meta.env.VITE_API_URL}/${p}`
                    }
                    alt={`complaint-${i}`}
                    className="w-full h-56 object-cover rounded-lg"
                  />
                ))}
              </div>
            ) : null}

            <p className="text-gray-700 mb-3">{selectedComplaint.description}</p>

            {/* ✅ Status Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Reported</span>
                <span>In Progress</span>
                <span>Completed</span>
              </div>
              <div className="w-full bg-gray-300 h-2 rounded-full">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    selectedComplaint.status === "Resolved"
                      ? "bg-green-500 w-full"
                      : selectedComplaint.status === "In Progress"
                      ? "bg-yellow-400 w-1/2"
                      : "bg-gray-400 w-1/4"
                  }`}
                ></div>
              </div>
            </div>

            {/* ✅ Upvote / Downvote */}
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => handleVote(selectedComplaint._id, "up")}
                disabled={voting}
                className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                👍 {selectedComplaint.upvotes?.length || 0}
              </button>

              <button
                onClick={() => handleVote(selectedComplaint._id, "down")}
                disabled={voting}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                👎 {selectedComplaint.downvotes?.length || 0}
              </button>
            </div>

            {/* ✅ Comments */}
            <div>
              <h3 className="font-semibold mb-2 text-gray-700">Comments</h3>
              <div className="max-h-48 overflow-y-auto bg-gray-50 p-2 rounded-lg">
                {selectedComplaint.comments?.length > 0 ? (
                  selectedComplaint.comments.map((com, idx) => (
                    <div
                      key={idx}
                      className="text-sm text-gray-600 border-b border-gray-200 py-1"
                    >
                      <div className="text-xs text-gray-400">
                        {new Date(com.createdAt).toLocaleString()}
                      </div>
                      <div>💬 {com.text}</div>
                    </div>
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
                  disabled={postingComment}
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



