 import React, { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function ReportIssue() {
  const [formData, setFormData] = useState({
    issueTitle: "",
    issueType: "",
    priorityLevel: "",
    address: "",
    landmark: "",
    description: "",
    location: null,
    photo: null,
  });

  const [preview, setPreview] = useState(null);
  const [fetchingAddress, setFetchingAddress] = useState(false);
  const [addressError, setAddressError] = useState("");
  const delayRef = useRef(null);

  // Auto-fetch lat/lng from address
  useEffect(() => {
    if (!formData.address.trim()) return;
    clearTimeout(delayRef.current);

    delayRef.current = setTimeout(async () => {
      try {
        setFetchingAddress(true);
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            formData.address
          )}`
        );
        const data = await res.json();
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setFormData(prev => ({
            ...prev,
            location: { lat: parseFloat(lat), lng: parseFloat(lon) },
          }));
          setAddressError("");
        } else {
          setAddressError("⚠️ Unable to find location for this address.");
        }
      } catch (error) {
        setAddressError("❌ Address lookup failed. Try again.");
      } finally {
        setFetchingAddress(false);
      }
    }, 1000);
  }, [formData.address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.location) {
      alert("📍 Please select a location or enter a valid address.");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.issueTitle);
      data.append("description", formData.description);
      data.append("address", formData.address);
      data.append("lat", formData.location.lat);
      data.append("lng", formData.location.lng);
      data.append("priorityLevel", formData.priorityLevel);
      data.append("issueType", formData.issueType);
      data.append("landmark", formData.landmark);
      if (formData.photo) data.append("photo", formData.photo);

      // Cookies are sent automatically with withCredentials: true
      const response = await axios.post("/complaints", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.data.message) {
        alert("✅ Complaint submitted successfully!");
        setFormData({
          issueTitle: "",
          issueType: "",
          priorityLevel: "",
          address: "",
          landmark: "",
          description: "",
          location: null,
          photo: null,
        });
        setPreview(null);
      } else {
        alert("❌ Failed to submit complaint!");
      }
    } catch (err) {
      console.error("Error submitting complaint:", err);
      alert("❌ Failed to submit complaint!");
    }
  };

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setFormData(prev => ({ ...prev, location: e.latlng }));
      },
    });

    useEffect(() => {
      if (formData.location) {
        map.setView([formData.location.lat, formData.location.lng], 15);
      }
    }, [formData.location, map]);

    return formData.location ? <Marker position={formData.location} /> : null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm p-4 flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="logo" className="w-6 h-6" />
          <span className="font-bold text-xl">CleanStreet</span>
        </div>
        <div className="flex flex-wrap gap-4 text-gray-700">
          <a href="/dashboard" className="hover:text-blue-600 font-medium">Dashboard</a>
          <a href="/report" className="hover:text-blue-600 font-medium">Report Issue</a>
          <a href="/complaints" className="hover:text-blue-600 font-medium">View Complaints</a>
          <a href="/profile" className="hover:text-blue-600 font-medium">Profile</a>
        </div>
        <button
          onClick={() => (window.location.href = "/login")}
          className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
        >
          Logout
        </button>
      </nav>

      {/* Complaint Form */}
      <div className="flex-grow flex justify-center items-start py-10 px-4">
        <div className="bg-white w-full max-w-4xl shadow-lg rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
            Report a Civic Issue
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Issue Title & Type */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Issue Title</label>
                <input
                  type="text"
                  name="issueTitle"
                  value={formData.issueTitle}
                  onChange={handleChange}
                  placeholder="Brief description of the issue"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Issue Type</label>
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select issue type</option>
                  <option value="Garbage">Garbage</option>
                  <option value="Road Damage">Road Damage</option>
                  <option value="Water Leakage">Water Leakage</option>
                  <option value="Streetlight">Streetlight</option>
                </select>
              </div>
            </div>

            {/* Priority & Address */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Priority Level</label>
                <select
                  name="priorityLevel"
                  value={formData.priorityLevel}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter street address"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                />
                {fetchingAddress && <p className="text-sm text-blue-600 mt-1">⏳ Locating on map...</p>}
                {addressError && <p className="text-sm text-red-500 mt-1">{addressError}</p>}
              </div>
            </div>

            {/* Landmark, Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Nearby Landmark (Optional)</label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                placeholder="e.g., Near City Hall"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue in detail..."
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              ></textarea>
            </div>
            
            {/* Photo Upload */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Upload Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
              {preview && (
                <div className="mt-3 flex justify-center">
                  <img src={preview} alt="Preview" className="w-48 h-48 object-cover rounded-lg shadow-md border" />
                </div>
              )}
            </div>

            

            {/* Map */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Location on Map</label>
              <MapContainer
                center={formData.location ? [formData.location.lat, formData.location.lng] : [13.0827, 80.2707]}
                zoom={13}
                scrollWheelZoom={true}
                className="w-full h-60 rounded-lg"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                <LocationMarker />
              </MapContainer>
              {formData.location && (
                <p className="mt-2 text-sm text-gray-600">
                  📍 Lat: {formData.location.lat.toFixed(5)}, Lng: {formData.location.lng.toFixed(5)}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg mt-4"
            >
              Submit Complaint
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}