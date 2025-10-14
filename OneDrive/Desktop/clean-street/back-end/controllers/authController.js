import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"; import fs from "fs";

dotenv.config();
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
 });

// ✅ REGISTER USER
export const registerUser = async (req, res) => { 
  try {
    const { username, fullName, email, password, profilePic } = req.body; 
     if (!username || !email || !password) 
      return res.status(400).json({ message: "All fields are required" });
    const existingUser = await User.findOne({ email }); 
     if (existingUser) 
      return res.status(400).json({ message: "User already exists" });
    let imageUrl = ""; 
    if (profilePic && profilePic.startsWith("data:image")) { 
    const uploadResponse = await cloudinary.uploader.upload(profilePic,{
        folder: "cleanstreet_users",
      });
        imageUrl = uploadResponse.secure_url; 
     }
   const salt = await bcrypt.genSalt(10); 
   const hashedPassword = await bcrypt.hash(password, salt); 
   const newUser = new User({
      username,
      fullName, 
      email, 
      password: hashedPassword, 
      profilePic: imageUrl, 
    });
    await newUser.save();
    res.status(201).json({ message: "Registration successful" });
   } catch (error) {
        console.error("🔥 REGISTER ERROR:", error); 
        res.status(500).json({ message: "Registration failed", error: error.message });
     } }; 
     
     // ✅ LOGIN USER
      export const loginUser = async (req, res) => {
         try { 
          const { email, password } = req.body; 
          const user = await User.findOne({ email }); 
          if (!user) 
            return res.status(400).json({ message: "Invalid email or password" }); 
            const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch)
             return res.status(400).json({ message: "Invalid email or password" }); 
             const token = jwt.sign({ id: user._id }, 
                                      process.env.JWT_SECRET || "mysupersecretkey",
                                      { expiresIn: "7d", 
                                    });
             res.cookie("token", token,
               { httpOnly: true, 
                 secure: process.env.NODE_ENV === "production", 
                 sameSite: "lax", 
                 maxAge: 7 * 24 * 60 * 60 * 1000,
               }); 
             res.status(200).json({ message: "Login successful", 
                                    user: { id: user._id,
                                    username: user.username, 
                                    email: user.email, 
                                    profilePic: user.profilePic, },
                                   }); 
            } catch (error) {
               console.error("🔥 LOGIN ERROR:", error); 
               res.status(500).json({ message: "Server error", error: error.message });
             } };

  // ✅ GET PROFILE
        export const getProfile = async (req, res) => {
           try { 
            const user = await User.findById(req.user.id).select("-password");
             if (!user) return res.status(404).json({ message: "User not found" }); 
             res.status(200).json(user); } catch (error) { console.error("🔥 PROFILE ERROR:", error); 
              res.status(500).json({ message: "Server error" });
             } }; 
 // ✅ UPDATE PROFILE (for both text & image uploads) 
      export const updateProfile = async (req, res) => { 
        try { 
          let updateData = req.body;
         // ✅ Handle image upload (file or Base64) 
         if (req.file) { 
          const result = await cloudinary.uploader.upload(req.file.path, { folder: "cleanstreet_users", }); 
          updateData.profilePic = result.secure_url; 
          fs.unlinkSync(req.file.path); // delete temp file 
         } else if (updateData.profilePic && updateData.profilePic.startsWith("data:image")) {
           const uploadResponse = await cloudinary.uploader.upload(updateData.profilePic, { folder: "cleanstreet_users", });
            updateData.profilePic = uploadResponse.secure_url; } 
            const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, { new: true, }).select("-password"); 
            if (!updatedUser) return res.status(404).json({ message: "User not found" }); 
            res.status(200).json({ message: "✅ Profile updated successfully", user: updatedUser }); 
          } catch (error) { 
            console.error("🔥 UPDATE PROFILE ERROR:", error); 
            res.status(500).json({ message: "Server error", error: error.message }); } };

          // ✅ CHANGE PASSWORD
      export const changePassword = async (req, res) => {
         try { 
          const { oldPassword, newPassword } = req.body; 
          const user = await User.findById(req.user.id); 
          if (!user) 
            return res.status(404).json({ message: "User not found" });
          const isMatch = await bcrypt.compare(oldPassword, user.password); 
          if (!isMatch) 
            return res.status(400).json({ message: "Current password is incorrect" }); 
          const salt = await bcrypt.genSalt(10); 
          user.password = await bcrypt.hash(newPassword, salt); 
          await user.save();
          res.status(200).json({ message: "✅ Password changed successfully" });
         } catch (error) { 
          console.error("🔥 CHANGE PASSWORD ERROR:", error); 
          res.status(500).json({ message: "Server error" }); 
        } };