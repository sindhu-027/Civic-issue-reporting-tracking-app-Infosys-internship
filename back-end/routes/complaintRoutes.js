
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
} from "../controllers/complaintController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // 🔐 JWT auth check

const router = express.Router();

// ⚙️ Multer setup for image uploads
const storage = multer.memoryStorage(); // direct buffer -> Cloudinary
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only JPEG/PNG image files are allowed!"), false);
};
const upload = multer({ storage, fileFilter });

// =======================================================
// 🧾 COMPLAINT CRUD + REALTIME + ASSIGN + COMMENT + VOTE
// =======================================================

// 📝 Create complaint (supports multiple photos)
router.post("/", verifyToken, upload.array("photos", 5), createComplaint);

// ✏️ Edit complaint
router.put("/:id", verifyToken, upload.single("image"), editComplaint);

// ❌ Delete complaint
router.delete("/:id", verifyToken, deleteComplaint);

// 👤 Get user's own complaints
router.get("/my", verifyToken, getUserComplaints);

// 🧍 Volunteer - Get assigned complaints
router.get("/assigned", verifyToken, getAssignedComplaints);

// 📍 Volunteer - Get nearby complaints
router.get("/nearby", verifyToken, getNearbyComplaints);

// 🧑‍💼 Admin - Get all complaints
router.get("/all", verifyToken, getAllComplaints);

// 🔄 Update complaint status
router.put("/:id/status", verifyToken, updateComplaintStatus);

// ✅ Assign complaint (volunteer)
router.post("/assign", verifyToken, assignComplaint);

// 🚫 Unassign complaint (volunteer)
router.post("/unassign", verifyToken, unassignComplaint);

// 💬 Add comment
router.post("/:id/comment", verifyToken, addComment);

// 👍 Upvote & 👎 Downvote
router.post("/:id/upvote", verifyToken, upvoteComplaint);
router.post("/:id/downvote", verifyToken, downvoteComplaint);

// 📊 Dashboard stats (auto detects role)
router.get("/stats", verifyToken, getDashboardStats);

export default router;
