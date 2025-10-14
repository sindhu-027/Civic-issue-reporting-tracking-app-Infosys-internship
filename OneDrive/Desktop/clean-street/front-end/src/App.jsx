// import React from "react";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Dashboard from "./components/Dashboard";

// function App() {
//   return (
//     <BrowserRouter>
//       <nav style={{ margin: "10px" }}>
//         <Link to="/login" style={{ margin: "10px" }}>Login</Link>
//         <Link to="/register" style={{ margin: "10px" }}>Register</Link>
//         <Link to="/dashboard" style={{ margin: "10px" }}>Dashboard</Link>
//       </nav>

//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Home from "./components/Home"; // moved to components

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} /> {/* Default Home */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Home from "./components/Home";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Home from "./components/Home";
// import Dashboard from "./components/Dashboard"; // ✅ Import it

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ Add this */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./components/Home";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Dashboard from "./components/Dashboard";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import LandingPage from "./components/Home";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";
// import Profile from "./components/Profile";
// import Register from "./components/Register";
// import ReportIssue from "./components/ReportIssue";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/report" element={<ReportIssue/>} />
//         <Route path="/profile" element={<Profile />} /> {/* Profile route */}
//       </Routes>
//     </Router>
//   );
// }

//export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./components/Home";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";
// import Profile from "./components/Profile";
// import Register from "./components/Register";
// import ReportIssue from "./components/ReportIssue";
// import { Home } from "lucide-react";
// import api from "./api";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/report" element={<ReportIssue />} />
//         <Route path="/profile" element={<Profile />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



//123456789




import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ReportIssue from "./components/ReportIssue";
import Profile from "./components/Profile";
import ViewComplaints from "./components/ViewComplaints";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/complaints" element={<ViewComplaints />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}


