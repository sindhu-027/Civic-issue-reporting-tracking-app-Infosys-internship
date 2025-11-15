import { useState, useEffect } from "react";
import api from "../api/axios"; // ✅ using the centralized axios instance

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    joinDate: "",
    profilePic: "",
  });

  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  //  Fetch user profile on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/profile");
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Upload profile picture
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("profilePic", file);

    try {
      const res = await api.put("/auth/profile/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData(res.data.user);
      alert("✅ Profile picture updated successfully!");
    } catch (err) {
      console.error("Error uploading profile pic:", err);
      alert("❌ Failed to upload profile picture");
    }
  };

  //  Save profile updates
  const handleSave = async () => {
    try {
      const res = await api.put("/auth/profile/update", formData);
      setFormData(res.data.user);
      setEditMode(false);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("❌ Failed to update profile");
    }
  };

  // ✅ Change password
  const handlePasswordChange = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("⚠️ New passwords do not match!");
      return;
    }

    try {
      await api.put("/auth/change-password", {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      });
      alert("✅ Password changed successfully!");
      setShowPasswordModal(false);
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error("Error changing password:", err);
      alert("❌ Failed to change password");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 pt-[90px] px-4 sm:px-6 lg:px-10">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full h-14 bg-white shadow-sm p-4 flex flex-wrap justify-between items-center z-50">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="logo" className="w-6 h-6" />
          <span className="font-bold text-xl">CleanStreet</span>
        </div>

        <div className="flex flex-wrap gap-4 text-gray-700">
          <a href="/dashboard" className="hover:text-blue-600 font-medium">
            Dashboard
          </a>
          <a href="/report" className="hover:text-blue-600 font-medium">
            Report Issue
          </a>
          <a href="/complaints" className="hover:text-blue-600 font-medium">
            View Complaints
          </a>
          <a href="/profile" className="hover:text-blue-600 font-medium">
            Profile
          </a>
        </div>

        <button
          onClick={() => (window.location.href = "/login")}
          className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
        >
          Logout
        </button>
      </nav>

      {/* Profile Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* Left Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
          <div className="relative w-32 h-32 sm:w-36 sm:h-36">
            <img
              src={formData.profilePic || "/default-profile.jpg"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-gray-200"
            />
            <label className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-all">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              📷
            </label>
          </div>

          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            {formData.fullName || "User"}
          </h2>
          <p className="text-gray-500">@{formData.username}</p>
          <span className="mt-2 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
            Citizen
          </span>
          <p className="text-gray-600 text-center mt-4 text-sm">{formData.bio}</p>
          <p className="text-xs text-gray-400 mt-2">
            Member since{" "}
            {formData.joinDate
              ? new Date(formData.joinDate).toLocaleDateString()
              : "N/A"}
          </p>

          <div className="w-full mt-6 flex flex-col gap-3">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="w-full py-2 border rounded-lg hover:bg-gray-100 transition-all"
            >
              Change Password
            </button>
            <button className="w-full py-2 border rounded-lg hover:bg-gray-100 transition-all">
              Privacy Settings
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Account Information
            </h3>
            <button
              onClick={() => setEditMode(!editMode)}
              className="text-blue-600 font-medium hover:underline"
            >
              {editMode ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["username", "fullName", "email", "phone", "location"].map(
              (field) => (
                <div key={field}>
                  <label className="block text-sm text-gray-600 capitalize">
                    {field}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    disabled={!editMode || field === "email"}
                    value={formData[field] || ""}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none ${
                      editMode && field !== "email"
                        ? "bg-white"
                        : "bg-gray-100 cursor-not-allowed"
                    }`}
                  />
                </div>
              )
            )}

            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-600">Bio</label>
              <textarea
                name="bio"
                disabled={!editMode}
                value={formData.bio || ""}
                onChange={handleChange}
                className={`w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none ${
                  editMode ? "bg-white" : "bg-gray-100"
                }`}
                rows={3}
              />
            </div>
          </div>

          {editMode && (
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-80 sm:w-96">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Change Password
            </h2>

            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={passwords.oldPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, oldPassword: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={passwords.confirmPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
