

// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import api from "../api/axios"; // ✅ use our axios instance

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await api.post("/auth/login", { email, password });

//       if (res.status === 200) {
//         // ✅ Backend sets the secure cookie automatically
//         // Optionally, store user info for display only (not sensitive)
//         sessionStorage.setItem("user", JSON.stringify(res.data.user));

//         navigate("/dashboard");
//       }
//     } catch (error) {
//       console.error(error);
//       alert(error.response?.data?.message || "Server error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center"
//       style={{ backgroundImage: "url('/home-c.jpg')" }}
//     >
//       <div className="bg-white/90 p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md">
//         <div className="flex justify-center mb-6">
//           <img src="/logo.png" alt="Clean Street Logo" className="h-14 w-14" />
//         </div>

//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Login to Clean Street
//         </h2>

//         <form className="space-y-4" onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             required
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-green-600 hover:underline">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios"; // ✅ centralized axios instance

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Axios automatically uses baseURL from .env
      const res = await api.post("/auth/login", { email, password });

      if (res.status === 200) {
        // ✅ Secure cookie is already set by backend
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      alert(error.response?.data?.message || "Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/home-c.jpg')" }}
    >
      <div className="bg-white/90 p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* 🌟 Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Clean Street Logo" className="h-14 w-14" />
        </div>

        {/* 🧾 Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Clean Street
        </h2>

        {/* 🧩 Login Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          {/* 🔘 Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* 🔗 Register Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
