import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios"; // ✅ centralized axios instance

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [preview, setPreview] = useState(null);
  const [role, setRole] = useState("user");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [autoDetected, setAutoDetected] = useState(false);

  const navigate = useNavigate();
  const OPENCAGE_API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY || "21d0fc89a07b4c92ba5ec05aea6eb365";

  // ✅ Auto-detect user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const latitude = pos.coords.latitude;
          const longitude = pos.coords.longitude;
          setLat(latitude);
          setLng(longitude);
          setAutoDetected(true);

          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
            );
            const data = await response.json();
            if (data.results.length > 0) {
              setAddress(data.results[0].formatted);
            }
          } catch (err) {
            console.error("Location fetch error:", err);
          }
        },
        () => setAutoDetected(false)
      );
    } else {
      alert("Geolocation not supported by this browser.");
    }
  }, []);

  // ✅ Handle profile picture upload
  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ✅ Convert manual address to lat/lng
  const handleAddressChange = async (e) => {
    const value = e.target.value;
    setAddress(value);

    if (value.trim().length > 3) {
      try {
        const res = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            value
          )}&key=${OPENCAGE_API_KEY}`
        );
        const data = await res.json();
        if (data.results.length > 0) {
          setLat(data.results[0].geometry.lat);
          setLng(data.results[0].geometry.lng);
        }
      } catch (err) {
        console.error("Manual address fetch error:", err);
      }
    }
  };

  // ✅ Register handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!lat || !lng || !address) {
      alert("⚠️ Please provide a valid location.");
      return;
    }

    try {
      const userData = {
        username,
        email,
        password,
        profilePic,
        role,
        address,
        lat,
        lng,
      };

      const res = await api.post("/auth/register", userData);

      if (res.status === 201) {
        alert("✅ Registration successful!");
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/street-bg.jpg')" }}
    >
      <div className="bg-white/90 p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="Clean Street Logo" className="h-14 w-14" />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        {/* Profile Picture */}
        <div className="flex justify-center mb-4">
          <label htmlFor="profilePicInput" className="cursor-pointer">
            <div className="w-24 h-24 rounded-full border-2 border-green-500 overflow-hidden flex items-center justify-center bg-gray-100">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-green-500 font-bold text-3xl">👤</span>
              )}
            </div>
          </label>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            id="profilePicInput"
            type="file"
            accept="image/*"
            onChange={handleProfileChange}
            className="hidden"
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          />

          {/* 📍 Location Input */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Location
            </label>
            <input
              type="text"
              placeholder="Enter your location"
              value={address}
              onChange={handleAddressChange}
              disabled={autoDetected && address}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              {autoDetected
                ? "✅ Location detected automatically"
                : "📍 Enter your address manually"}
            </p>
          </div>

          {/* Role Selection */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="user">User</option>
            <option value="volunteer">Volunteer</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
