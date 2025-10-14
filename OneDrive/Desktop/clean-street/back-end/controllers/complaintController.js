import Complaint from "../models/complaintModel.js"; 
import cloudinary from "../config/cloudinary.js";

 // ✅ Create complaint 
export const createComplaint = async (req, res) => { 
  try { 
    const { title, description, address, lat, lng, priorityLevel, issueType, landmark, } = req.body; 
    if (!title || !description) 
      { return res .status(400) .json({ message: "Title and description are required" }); }
     // ✅ Upload photo to Cloudinary (if file exists) 
     let photoUrl = "";
    if (req.file)
       { const result = await cloudinary.uploader.upload(req.file.path, { folder: "cleanstreet_complaints", });
     photoUrl = result.secure_url;
    } 
    // ✅ Create complaint document 
    const newComplaint = new Complaint({
      user_id: req.user.id,
      title, 
      description, 
      address, 
      location_coords: { lat, lng },
      priorityLevel, 
      issueType, 
      landmark, 
      photo: photoUrl, 
      status: "received",
     }); 
    await newComplaint.save();
    return res.status(201).json({ success: true, message: "Complaint submitted successfully", complaint: newComplaint, });
   } catch (err) { 
    console.error("🔥 CREATE COMPLAINT ERROR:", err); return res .status(500) .json({ message: "Server error", error: err.message }); } };
     // ✅ Get user's complaints
    export const getUserComplaints = async (req, res) => {
       try {
         const complaints = await Complaint.find({ user_id: req.user.id }).sort({ createdAt: -1, }); res.status(200).json(complaints);
       } catch (err) {
         res.status(500).json({ message: "Server error" }); } }; 
    // ✅ Dashboard stats 
    export const getDashboardStats = async (req, res) => { 
      try { 
        const userId = req.user.id; 
        const total = await Complaint.countDocuments({ user_id: userId });
        const pending = await Complaint.countDocuments({ 
          user_id: userId, 
          status: "received",
        }); 
        const inProgress = await Complaint.countDocuments({
          user_id: userId,
          status: "in_review",
        }); 
        const resolved = await Complaint.countDocuments({
           user_id: userId, 
           status: "resolved", 
        }); 
        const activities = await Complaint.find({user_id: userId }) .sort({ createdAt: -1 }) .limit(5) .select("title status createdAt"); 
        res.status(200).json({
           total, pending, inProgress, resolved, activities: activities.map((a) => ({
           message: a.title, status: a.status, time: new Date(a.createdAt).toLocaleString(), })),
       });
       } catch (err) { 
        res.status(500).json({ message: "Server error" });
       } };
   // ✅ Get all complaints (for View Complaints page)
    export const getAllComplaints = async (req, res) => {
       try { 
        const complaints = await Complaint.find().sort({ createdAt: -1 }); 
        res.status(200).json(complaints);
       } catch (err) { 
        console.error("🔥 GET ALL COMPLAINTS ERROR:", err);
        res.status(500).json({ message: "Server error", error: err.message }); 
      } };



// 🗳️ Vote Complaint
export const voteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body; // "upvote" or "downvote"
    const userId = req.user.id;

    const complaint = await Complaint.findById(id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    // Remove user from both arrays to avoid duplicate votes
    complaint.upvotes = complaint.upvotes.filter((uid) => uid.toString() !== userId);
    complaint.downvotes = complaint.downvotes.filter((uid) => uid.toString() !== userId);

    // Add vote
    if (type === "upvote") {
      complaint.upvotes.push(userId);
    } else if (type === "downvote") {
      complaint.downvotes.push(userId);
    }

    await complaint.save();
    res.json({ message: "Vote updated successfully", complaint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating vote" });
  }
};

// 💬 Add Comment
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    const complaint = await Complaint.findById(id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    const newComment = {
      user: userId,
      text,
      createdAt: new Date(),
    };

    complaint.comments.push(newComment);
    await complaint.save();

    res.status(201).json({ message: "Comment added successfully", complaint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding comment" });
  }
};
