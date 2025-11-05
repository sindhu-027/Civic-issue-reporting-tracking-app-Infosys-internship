
// models/complaintModel.js
import mongoose from "mongoose";

// ✅ Comment Schema
const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true } // Allow editing/deleting comments
);

// ✅ Complaint Schema
const complaintSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    title: { type: String, required: true },
    description: { type: String, required: true },

    // ✅ Multiple photos supported
    photos: {
      type: [String],
      default: [],
    },

    // 📍 Location details
    location: { type: String, default: "" },
    latitude: { type: Number },
    longitude: { type: Number },

    category: { type: String, default: "" },

    // 🧑‍🤝‍🧑 Volunteer assignment
    volunteer: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

    // ⚙️ Complaint status
    status: {
      type: String,
      enum: ["Pending", "Assigned", "In Progress", "Resolved"],
      default: "Pending",
    },

    // 👍 Separate arrays for votes
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // 💬 Comments
    comments: [commentSchema],
  },
  { timestamps: true }
);

// ✅ Export model
const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;
