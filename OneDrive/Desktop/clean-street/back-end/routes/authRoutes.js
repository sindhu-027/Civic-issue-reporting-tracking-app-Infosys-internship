import express from "express"; 
import multer from "multer"; 
import { 
  registerUser, 
  loginUser, 
  getProfile, 
  updateProfile, 
  changePassword, 
} from "../controllers/authController.js"; 
import { verifyToken } from "../middleware/authMiddleware.js"; 

const router = express.Router(); // Multer setup for temporary file storage 
const upload = multer({ dest: "uploads/" }); 

router.post("/register", registerUser); 
router.post("/login", loginUser); 
router.get("/profile", verifyToken, getProfile); 

// ✅ Profile update via text fields (form data) 
router.put("/profile/update", verifyToken, updateProfile);

// ✅ Profile picture upload route 
router.put("/profile/upload", verifyToken, upload.single("profilePic"), updateProfile); 
router.put("/change-password", verifyToken, changePassword); export default router;