
import React, { useState, useEffect, useRef } from "react";
import api from "../api/axios";
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
    photos: [],
  });

  const [previews, setPreviews] = useState([]);
  const [fetchingAddress, setFetchingAddress] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const delayRef = useRef(null);

  // 🌍 Fetch coordinates automatically when address changes
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
          setFormData((prev) => ({
            ...prev,
            location: { lat: parseFloat(lat), lng: parseFloat(lon) },
          }));
          setAddressError("");
        } else {
          setAddressError("⚠️ Unable to find location for this address.");
        }
      } catch {
        setAddressError("❌ Address lookup failed. Try again.");
      } finally {
        setFetchingAddress(false);
      }
    }, 1000);
  }, [formData.address]);

  // 🧾 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🖼️ Handle multiple image selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData((prev) => ({ ...prev, photos: files }));

      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews(newPreviews);
    } else {
      setFormData((prev) => ({ ...prev, photos: [] }));
      setPreviews([]);
    }
  };

  // 🚀 Submit the complaint
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!formData.location) {
      alert("📍 Please select a location or enter a valid address.");
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("title", formData.issueTitle);
      data.append("description", formData.description);
      data.append("category", formData.issueType);
      data.append("location", formData.address);
      data.append("latitude", formData.location.lat);
      data.append("longitude", formData.location.lng);
      data.append("priorityLevel", formData.priorityLevel);
      data.append("landmark", formData.landmark);

      // ✅ Append all photos (multiple)
      formData.photos.forEach((photo) => {
        data.append("photos", photo);
      });

      const response = await api.post("/complaints", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.success) {
        alert("✅ Complaint submitted successfully!");
        setFormData({
          issueTitle: "",
          issueType: "",
          priorityLevel: "",
          address: "",
          landmark: "",
          description: "",
          location: null,
          photos: [],
        });
        setPreviews([]);
        window.location.href = "/dashboard";
      } else {
        alert("❌ Failed to submit complaint!");
      }
    } catch (err) {
      console.error("Error submitting complaint:", err);
      alert(err.response?.data?.message || "❌ Failed to submit complaint!");
    } finally {
      setTimeout(() => setSubmitting(false), 600);
    }
  };

  // 📍 Map location selector
  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setFormData((prev) => ({ ...prev, location: e.latlng }));
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

      {/* Complaint Form */}
      <div className="flex-grow flex justify-center items-start py-10 px-4">
        <div className="bg-white w-full max-w-4xl shadow-lg rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
            Report a Civic Issue
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="on">
            {/* Title & Type */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="issueTitle" className="block text-gray-700 font-medium mb-1">
                  Issue Title
                </label>
                <input
                  id="issueTitle"
                  name="issueTitle"
                  type="text"
                  value={formData.issueTitle}
                  onChange={handleChange}
                  autoComplete="on"
                  placeholder="Brief description of the issue"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="issueType" className="block text-gray-700 font-medium mb-1">
                  Issue Type
                </label>
                <select
                  id="issueType"
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleChange}
                  autoComplete="on"
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
                <label htmlFor="priorityLevel" className="block text-gray-700 font-medium mb-1">
                  Priority Level
                </label>
                <select
                  id="priorityLevel"
                  name="priorityLevel"
                  value={formData.priorityLevel}
                  onChange={handleChange}
                  autoComplete="on"
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
                <label htmlFor="address" className="block text-gray-700 font-medium mb-1">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  autoComplete="street-address"
                  placeholder="Enter street address"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                />
                {fetchingAddress && (
                  <p className="text-sm text-blue-600 mt-1">⏳ Locating on map...</p>
                )}
                {addressError && (
                  <p className="text-sm text-red-500 mt-1">{addressError}</p>
                )}
              </div>
            </div>

            {/* Landmark & Description */}
            <div>
              <label htmlFor="landmark" className="block text-gray-700 font-medium mb-1">
                Nearby Landmark (Optional)
              </label>
              <input
                id="landmark"
                name="landmark"
                type="text"
                value={formData.landmark}
                onChange={handleChange}
                placeholder="e.g., Near City Hall"
                autoComplete="on"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue in detail..."
                autoComplete="on"
                rows="4"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            {/* Multiple Photo Upload */}
            <div>
              <label htmlFor="photos" className="block text-gray-700 font-medium mb-1">
                Upload Photos (You can select multiple)
              </label>
              <input
                id="photos"
                name="photos"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                autoComplete="off"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
              {previews.length > 0 && (
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {previews.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-40 object-cover rounded-lg shadow-md border"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Map */}
            <div>
              <label htmlFor="map" className="block text-gray-700 font-medium mb-1">
                Location on Map
              </label>
              <MapContainer
                id="map"
                center={
                  formData.location
                    ? [formData.location.lat, formData.location.lng]
                    : [13.0827, 80.2707]
                }
                zoom={13}
                scrollWheelZoom
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
                  📍 Lat: {formData.location.lat.toFixed(5)}, Lng:{" "}
                  {formData.location.lng.toFixed(5)}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full ${
                submitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-medium py-2 px-4 rounded-lg mt-4`}
            >
              {submitting ? "Submitting..." : "Submit Complaint"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
