import express from "express"; 
import multer from "multer"; 
import { verifyToken } from "../middleware/authMiddleware.js"; 
import { 
  createComplaint, 
  getUserComplaints, 
  getDashboardStats, 
  getAllComplaints,
  voteComplaint,
  addComment 
} from "../controllers/complaintController.js"; 

const router = express.Router(); // ✅ Multer config for Cloudinary uploads 

const storage = multer.diskStorage({}); 
const upload = multer({ storage }); 

// ✅ Routes 
router.post("/", verifyToken, upload.single("photo"), createComplaint); 
router.get("/my", verifyToken, getUserComplaints); 
router.get("/dashboard", verifyToken, getDashboardStats); 
router.get("/all", verifyToken, getAllComplaints); // 🆕 Added for all complaints

// 🗳️ Voting route
router.post("/vote/:id", verifyToken, voteComplaint);

// 💬 Comment route
router.post("/comment/:id", verifyToken, addComment);

export default router;