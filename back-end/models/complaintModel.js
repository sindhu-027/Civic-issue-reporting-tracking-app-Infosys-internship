// import mongoose from "mongoose";
//  const complaintSchema = new mongoose.Schema( { 
//   user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   photo: { type: String, default: "" }, // Cloudinary URL 
//   location_coords: { lat: { type: Number }, lng: { type: Number }, },
//   address: { type: String },
//   assigned_to: { type: String, default: "Not assigned" }, 
//   status: { type: String, enum: ["received", "in_review", "resolved"], default: "received", },
//  },
  
//   { timestamps: true } ); 
  
//   const Complaint = mongoose.model("Complaint", complaintSchema); 
// export default Complaint;



//vote 

import mongoose from "mongoose";

// 💬 Comment Schema
const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

// 🧾 Complaint Schema
const complaintSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String, default: "" }, // Cloudinary URL
    location_coords: {
      lat: { type: Number },
      lng: { type: Number },
    },
    address: { type: String },
    assigned_to: { type: String, default: "Not assigned" },
    status: {
      type: String,
      enum: ["received", "in_review", "resolved"],
      default: "received",
    },

    // 🗳️ Voting system
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // 💬 Comments system
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;
