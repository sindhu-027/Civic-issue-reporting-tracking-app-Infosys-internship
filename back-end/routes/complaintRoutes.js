
// // routes/complaintRoutes.js
// import express from "express";
// import multer from "multer";
// import path from "path";
// import {
//   createComplaint,
//   editComplaint,
//   deleteComplaint,
//   getUserComplaints,
//   getAllComplaints,
//   getNearbyComplaints,
//   assignComplaint,
//   unassignComplaint,
//   updateComplaintStatus,
//   getAssignedComplaints,
//   getDashboardStats,
//   addComment,
//   upvoteComplaint,
//   downvoteComplaint,
//   getAnalytics,
//   getAdminOverview,
//   getMonthlyStats,
//   generateMonthlyReport,
//   updateUserRole,
//   getAdminLogs,
//   changeComplaintStatus
// } from "../controllers/complaintController.js";

// import { verifyToken } from "../middleware/authMiddleware.js"; // 🔐 JWT auth check

// const router = express.Router();

// // ⚙️ Multer setup for image uploads
// const storage = multer.memoryStorage(); // direct buffer -> Cloudinary
// const fileFilter = (req, file, cb) => {
//   const allowed = ["image/jpeg", "image/png", "image/jpg"];
//   if (allowed.includes(file.mimetype)) cb(null, true);
//   else cb(new Error("Only JPEG/PNG image files are allowed!"), false);
// };
// const upload = multer({ storage, fileFilter });

// // =======================================================
// // 🧾 COMPLAINT CRUD + REALTIME + ASSIGN + COMMENT + VOTE
// // =======================================================

// // 📝 Create complaint (supports multiple photos)
// router.post("/", verifyToken, upload.array("photos", 5), createComplaint);

// // ✏️ Edit complaint
// router.put("/:id", verifyToken, upload.single("image"), editComplaint);

// // ❌ Delete complaint
// router.delete("/:id", verifyToken, deleteComplaint);

// // 👤 Get user's own complaints
// router.get("/my", verifyToken, getUserComplaints);

// // 🧍 Volunteer - Get assigned complaints
// router.get("/assigned", verifyToken, getAssignedComplaints);

// // 📍 Volunteer - Get nearby complaints
// router.get("/nearby", verifyToken, getNearbyComplaints);

// // 🧑‍💼 Admin - Get all complaints
// router.get("/all", verifyToken, getAllComplaints);

// // 🔄 Update complaint status
// router.put("/:id/status", verifyToken, updateComplaintStatus);

// // ✅ Assign complaint (volunteer)
// //router.post("/assign", verifyToken, assignComplaint);
// router.put("/:id/assign", verifyToken, assignComplaint);


// // 🚫 Unassign complaint (volunteer)
// router.put("/:id/unassign",verifyToken ,unassignComplaint);
// //router.post("/unassign", verifyToken, unassignComplaint);

// // 💬 Add comment
// router.post("/:id/comment", verifyToken, addComment);

// // 👍 Upvote & 👎 Downvote
// router.post("/:id/upvote", verifyToken, upvoteComplaint);
// router.post("/:id/downvote", verifyToken, downvoteComplaint);

// // 📊 Dashboard stats (auto detects role)
// router.get("/stats", verifyToken, getDashboardStats);

// router.get("/analytics", verifyToken, getAnalytics);

// router.get("/admin-overview", verifyToken, getAdminOverview);

// // 🟩 Monthly complaint statistics route
// router.get("/monthly-stats", getMonthlyStats);

// // New route for PDF report
// router.get("/monthly-report", generateMonthlyReport);

// // router.put("/user-role", verifyToken, updateUserRole);

// // // Add this route for admin to change complaint status
// // router.put("/:id/change-status", verifyToken, changeComplaintStatus);

// // Add this in complaintRoutes.js or authRoutes.js
// //router.put("/auth/update-role/:id", verifyToken, updateUserRole);
// // routes/authRoutes.js
// // Only admin can update roles
// router.put("/updateRole", verifyToken, updateUserRole);


// router.put("/update-status/:id", verifyToken, updateComplaintStatus);

// router.get("/admin/logs", getAdminLogs);

// export default router;


// // routes/complaintRoutes.js
// import express from "express";
// import multer from "multer";
// import path from "path";
// import {
//   createComplaint,
//   editComplaint,
//   deleteComplaint,
//   getUserComplaints,
//   getAllComplaints,
//   getNearbyComplaints,
//   assignComplaint,
//   unassignComplaint,
//   updateComplaintStatus,
//   getAssignedComplaints,
//   getDashboardStats,
//   addComment,
//   upvoteComplaint,
//   downvoteComplaint,
//   getAnalytics,
//   getAdminOverview,
//   getMonthlyStats,
//   generateMonthlyReport,
//   updateUserRole,
//   getAdminLogs,
//   changeComplaintStatus
// } from "../controllers/complaintController.js";

// import { verifyToken } from "../middleware/authMiddleware.js"; // 🔐 JWT auth check

// const router = express.Router();

// // =======================================================
// // ⚙️ Multer setup for image uploads
// // =======================================================
// const storage = multer.memoryStorage(); // direct buffer -> Cloudinary
// const fileFilter = (req, file, cb) => {
//   const allowed = ["image/jpeg", "image/png", "image/jpg"];
//   if (allowed.includes(file.mimetype)) cb(null, true);
//   else cb(new Error("Only JPEG/PNG image files are allowed!"), false);
// };
// const upload = multer({ storage, fileFilter });

// // =======================================================
// // 🧾 COMPLAINT ROUTES
// // =======================================================

// // 📝 Create complaint (supports multiple photos)
// router.post("/", verifyToken, upload.array("photos", 5), createComplaint);

// // ✏️ Edit complaint (single photo optional)
// router.put("/:id", verifyToken, upload.single("image"), editComplaint);

// // ❌ Delete complaint
// router.delete("/:id", verifyToken, deleteComplaint);

// // 👤 Get user's own complaints
// router.get("/my", verifyToken, getUserComplaints);

// // 🧍 Volunteer - Get assigned complaints
// router.get("/assigned", verifyToken, getAssignedComplaints);

// // 📍 Volunteer - Get nearby complaints
// router.get("/nearby", verifyToken, getNearbyComplaints);

// // 🧑‍💼 Admin - Get all complaints
// router.get("/all", verifyToken, getAllComplaints);

// // 🔄 Update complaint status
// router.put("/:id/status", verifyToken, updateComplaintStatus);

// // 🟢 Assign complaint to volunteer
// router.put("/:id/assign", verifyToken, assignComplaint);

// // 🚫 Unassign complaint
// router.put("/:id/unassign", verifyToken, unassignComplaint);

// // 💬 Add comment
// router.post("/:id/comment", verifyToken, addComment);

// // 👍 Upvote & 👎 Downvote
// router.post("/:id/upvote", verifyToken, upvoteComplaint);
// router.post("/:id/downvote", verifyToken, downvoteComplaint);

// // =======================================================
// // 📊 DASHBOARD & ANALYTICS
// // =======================================================

// // Dashboard stats auto-detects role
// router.get("/stats", verifyToken, getDashboardStats);

// // Admin overview
// router.get("/admin-overview", verifyToken, getAdminOverview);

// // Analytics
// router.get("/analytics", verifyToken, getAnalytics);

// // Monthly complaint stats
// router.get("/monthly-stats", verifyToken, getMonthlyStats);

// // Monthly PDF report
// router.get("/monthly-report", verifyToken, generateMonthlyReport);

// // Admin logs
// router.get("/admin/logs", verifyToken, getAdminLogs);

// // =======================================================
// // ⚙️ ADMIN ACTIONS
// // =======================================================

// // Update user role (Admin only)
// router.put("/update-role", verifyToken, updateUserRole);

// // Change complaint status (Admin only)
// router.put("/:id/change-status", verifyToken, changeComplaintStatus);

// // =======================================================

// export default router;


// routes/complaintRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import {
  createComplaint,
  editComplaint,
  deleteComplaint,
  getUserComplaints,
  getAllComplaints,
  getNearbyComplaints,
  assignComplaint,
  unassignComplaint,
  updateComplaintStatus,
  getAssignedComplaints,
  getDashboardStats,
  addComment,
  upvoteComplaint,
  downvoteComplaint,
  getAnalytics,
  getAdminOverview,
  getMonthlyStats,
  generateMonthlyReport,
  updateUserRole,
  getAdminLogs,
  changeComplaintStatus,
  getNearbyVolunteers,
  selfAssignComplaint
} from "../controllers/complaintController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // 🔐 JWT auth check

const router = express.Router();

// =======================================================
// ⚙️ Multer setup for image uploads
// =======================================================
const storage = multer.memoryStorage(); // direct buffer -> Cloudinary
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only JPEG/PNG image files are allowed!"), false);
};
const upload = multer({ storage, fileFilter });

// =======================================================
// ⚙️ ADMIN ACTIONS (🚨 Must come before ID-based routes)
// =======================================================

// ✅ Update user role (matches FE URL: /api/complaints/updateRole)
router.put("/updateRole", verifyToken, updateUserRole);

// ✅ Update complaint status (matches FE URL: /api/complaints/update-status/:id)
router.put("/update-status/:id", verifyToken, updateComplaintStatus);

// ✅ Change complaint status (Admin only - alternate route)
router.put("/:id/change-status", verifyToken, changeComplaintStatus);

// =======================================================
// 🧾 COMPLAINT ROUTES
// =======================================================

// 📝 Create complaint (supports multiple photos)
router.post("/", verifyToken, upload.array("photos", 5), createComplaint);

// 👤 Get user's own complaints
router.get("/my", verifyToken, getUserComplaints);

// 🧍 Volunteer - Get assigned complaints
router.get("/assigned", verifyToken, getAssignedComplaints);

// 📍 Volunteer - Get nearby complaints
router.get("/nearby", verifyToken, getNearbyComplaints);

// 🧑‍💼 Admin - Get all complaints
router.get("/all", verifyToken, getAllComplaints);

// 🟢 Assign complaint to volunteer
router.put("/:id/assign", verifyToken, assignComplaint);

// 🚫 Unassign complaint
router.put("/:id/unassign", verifyToken, unassignComplaint);

// Fetch nearby volunteers
router.get("/:id/nearby-volunteers", verifyToken, getNearbyVolunteers);


// Assign volunteer
//router.put("/:id/assign", verifyToken, assignVolunteer);
// Volunteer self-assignment
// router.put("/:id/self-assign", verifyToken, assignVolunteer);
// Volunteer self-assign
router.put("/:id/self-assign", verifyToken, selfAssignComplaint);

// 💬 Add comment
router.post("/:id/comment", verifyToken, addComment);

// 👍 Upvote & 👎 Downvote
router.post("/:id/upvote", verifyToken, upvoteComplaint);
router.post("/:id/downvote", verifyToken, downvoteComplaint);

// =======================================================
// 📊 DASHBOARD & ANALYTICS
// =======================================================
router.get("/stats", verifyToken, getDashboardStats);
router.get("/admin-overview", verifyToken, getAdminOverview);
router.get("/analytics", verifyToken, getAnalytics);
router.get("/monthly-stats", verifyToken, getMonthlyStats);
router.get("/monthly-report", verifyToken, generateMonthlyReport);
router.get("/admin/logs", verifyToken, getAdminLogs);

// =======================================================
// 🛠️ BASIC CRUD (keep these LAST)
// =======================================================

// ✏️ Edit complaint
router.put("/:id", verifyToken, upload.single("image"), editComplaint);

// ❌ Delete complaint
router.delete("/:id", verifyToken, deleteComplaint);

// =======================================================
export default router;
