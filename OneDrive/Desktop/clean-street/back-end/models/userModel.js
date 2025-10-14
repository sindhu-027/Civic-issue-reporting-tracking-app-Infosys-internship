import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
    type: String,
    enum: ["user", "volunteer", "admin"], // allowed roles
    default: "user",
     },
    phone: { type: String },
    location: { type: String },
    bio: { type: String },
    profilePic: { type: String, default: "" }, // Cloudinary URL
    joinDate: { type: Date, default: Date.now },
    
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
