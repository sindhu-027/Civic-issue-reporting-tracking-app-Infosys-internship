// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import authRoutes from "./routes/authRoutes.js";
// import complaintRoutes from "./routes/complaintRoutes.js";

// dotenv.config();
// const app = express();

// // ✅ Middleware
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(cookieParser());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));

// // ✅ MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.log("❌ MongoDB connection error:", err));

// // ✅ Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/complaints", complaintRoutes); // submit + fetch
// // Note: dashboard stats route already included in complaintRoutes

// // ✅ Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


//---crt

// // server.js
// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import http from "http";
// import { Server } from "socket.io";
// import authRoutes from "./routes/authRoutes.js";
// import complaintRoutes from "./routes/complaintRoutes.js";

// // IMPORTANT: import initSocket from complaintController so controller emits work
// import { initSocket } from "./controllers/complaintController.js";

// dotenv.config();
// const app = express();

// // ✅ CORS Setup
// app.use(
//   cors({
//     origin: "http://localhost:5173", // React dev port
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // ✅ Middleware
// app.use(cookieParser());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));

// // ✅ MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.log("❌ MongoDB connection error:", err));

// // ✅ Create HTTP server
// const server = http.createServer(app);

// // ✅ Initialize Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   },
// });

// // Attach io instance to app if other parts want it
// app.set("io", io);

// // Initialize controller-level socket helper so emitUpdate() inside controllers works
// initSocket(io);

// io.on("connection", (socket) => {
//   console.log("🟢 Socket connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("🔴 Socket disconnected:", socket.id);
//   });
// });

// // ✅ Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/complaints", complaintRoutes);

// // ✅ Start Server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


//pdt

// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import http from "http";
// import { Server } from "socket.io";
// import helmet from "helmet"; // 🛡️ Security headers
// import authRoutes from "./routes/authRoutes.js";
// import complaintRoutes from "./routes/complaintRoutes.js";
// import { initSocket } from "./controllers/complaintController.js";

// dotenv.config();

// const app = express();

// // ✅ Security middleware
// app.use(helmet());

// // ✅ Dynamic CORS setup for dev/prod
// const allowedOrigin = process.env.CLIENT_URL || "http://localhost:5173";
// app.use(
//   cors({
//     origin: allowedOrigin,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // ✅ Core middlewares
// app.use(cookieParser());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));

// // ✅ MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// // ✅ Create HTTP + WebSocket server
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: allowedOrigin,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   },
// });

// // Attach io to app and initialize
// app.set("io", io);
// initSocket(io);

// io.on("connection", (socket) => {
//   console.log("🟢 Socket connected:", socket.id);
//   socket.on("disconnect", () => console.log("🔴 Socket disconnected:", socket.id));
// });

// // ✅ API Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/complaints", complaintRoutes);

// // ✅ Global Error Handler
// app.use((err, req, res, next) => {
//   console.error("🌋 Global Error:", err.stack);
//   res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
// });

// // ✅ Graceful Shutdown
// process.on("SIGINT", async () => {
//   await mongoose.connection.close();
//   console.log("🛑 MongoDB disconnected gracefully");
//   process.exit(0);
// });

// // ✅ Start Server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



//pdt

// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import http from "http";
// import { Server } from "socket.io";
// import helmet from "helmet";

// // Routes
// import authRoutes from "./routes/authRoutes.js";
// import complaintRoutes from "./routes/complaintRoutes.js";

// // Load environment variables
// dotenv.config();

// const app = express();

// // ✅ Security middleware
// app.use(helmet());

// // ✅ Dynamic CORS setup (frontend URL)
// const allowedOrigin = process.env.CLIENT_URL || "http://localhost:5173";
// app.use(
//   cors({
//     origin: allowedOrigin,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // ✅ Core middlewares
// app.use(cookieParser());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));

// // ✅ MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) =>
//     console.error("❌ MongoDB connection error:", err.message)
//   );

// // ✅ Create HTTP + WebSocket server
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: allowedOrigin,
//     credentials: true,
//   },
//   transports: ["websocket"], // 🚀 Only WebSocket (no polling)
// });

// // ✅ Attach io globally to the app (so controllers can access)
// app.set("io", io);

// // ✅ Socket.IO events
// io.on("connection", (socket) => {
//   console.log("🟢 Socket connected:", socket.id);

//   socket.on("disconnect", (reason) => {
//     console.log("🔴 Socket disconnected:", socket.id, "Reason:", reason);
//   });
// });

// // ✅ API Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/complaints", complaintRoutes);

// // ✅ Health check route
// app.get("/", (req, res) => {
//   res.send("🌍 CleanStreet Backend is running successfully!");
// });

// // ✅ Global Error Handler
// app.use((err, req, res, next) => {
//   console.error("🌋 Global Error:", err.stack);
//   res
//     .status(err.status || 500)
//     .json({ message: err.message || "Internal Server Error" });
// });

// // ✅ Graceful Shutdown
// process.on("SIGINT", async () => {
//   await mongoose.connection.close();
//   console.log("🛑 MongoDB disconnected gracefully");
//   process.exit(0);
// });

// // ✅ Start Server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () =>
//   console.log(`🚀 Server running on port ${PORT}`)
// );



// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import http from "http";
// import { Server } from "socket.io";
// import helmet from "helmet";

// // Routes
// import authRoutes from "./routes/authRoutes.js";
// import complaintRoutes from "./routes/complaintRoutes.js";

// // Load environment variables
// dotenv.config();

// const app = express();

// // ✅ Security middleware
// app.use(helmet());

// // ✅ Dynamic CORS setup (frontend URL)
// const allowedOrigin = process.env.CLIENT_URL || "http://localhost:5173";
// app.use(
//   cors({
//     origin: allowedOrigin,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // ✅ Core middlewares
// app.use(cookieParser());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));

// // ✅ MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) =>
//     console.error("❌ MongoDB connection error:", err.message)
//   );

// // ✅ Create HTTP + WebSocket server
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: allowedOrigin,
//     credentials: true,
//   },
// });

// // ✅ Attach io globally
// app.set("io", io);

// // ✅ Socket.IO events
// io.on("connection", (socket) => {
//   console.log("🟢 Socket connected:", socket.id);

//   socket.on("disconnect", (reason) => {
//     console.log("🔴 Socket disconnected:", socket.id, "Reason:", reason);
//   });
// });

// // ✅ API Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/complaints", complaintRoutes);

// // ✅ Health check route
// app.get("/", (req, res) => {
//   res.send("🌍 CleanStreet Backend is running successfully!");
// });

// // ✅ Global Error Handler
// app.use((err, req, res, next) => {
//   console.error("🌋 Global Error:", err.stack);
//   res
//     .status(err.status || 500)
//     .json({ message: err.message || "Internal Server Error" });
// });

// // ✅ Graceful Shutdown
// process.on("SIGINT", async () => {
//   await mongoose.connection.close();
//   console.log("🛑 MongoDB disconnected gracefully");
//   process.exit(0);
// });

// // ✅ Start Server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () =>
//   console.log(`🚀 Server running on port ${PORT}`)
// );


// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import http from "http";
// import { Server } from "socket.io";
// import helmet from "helmet";

// // Routes
// import authRoutes from "./routes/authRoutes.js";
// import complaintRoutes from "./routes/complaintRoutes.js";

// dotenv.config();
// const app = express();

// // ✅ Security middleware
// app.use(helmet({
//   crossOriginResourcePolicy: false,
//   crossOriginEmbedderPolicy: false,
// }));

// // ✅ CORS setup for React frontend + Socket.IO
// const allowedOrigin = process.env.CLIENT_URL || "http://localhost:5173";
// app.use(
//   cors({
//     origin: allowedOrigin,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // ✅ Middleware
// app.use(cookieParser());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));

// // ✅ MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// // ✅ Create HTTP + WebSocket Server
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: allowedOrigin,
//     credentials: true,
//     methods: ["GET", "POST"],
//   },
//   transports: ["websocket"], // ✅ Prevent polling issue
// });

// // ✅ Attach socket instance globally
// app.set("io", io);

// // ✅ Socket.IO events
// io.on("connection", (socket) => {
//   console.log("🟢 Socket connected:", socket.id);
//   socket.on("disconnect", (reason) => {
//     console.log("🔴 Socket disconnected:", socket.id, "Reason:", reason);
//   });
// });

// // ✅ Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/complaints", complaintRoutes);

// // ✅ Health route
// app.get("/", (req, res) => {
//   res.send("🌍 CleanStreet Backend is running successfully!");
// });

// // ✅ Global Error Handler
// app.use((err, req, res, next) => {
//   console.error("🌋 Global Error:", err.stack);
//   res.status(err.status || 500).json({
//     message: err.message || "Internal Server Error",
//   });
// });

// // ✅ Graceful Shutdown
// process.on("SIGINT", async () => {
//   await mongoose.connection.close();
//   console.log("🛑 MongoDB disconnected gracefully");
//   process.exit(0);
// });

// // ✅ Start Server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import helmet from "helmet";

// Routes
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";

dotenv.config();
const app = express();

// ✅ Security middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginEmbedderPolicy: false,
}));

// ✅ CORS setup for React frontend + Socket.IO
const allowedOrigin = process.env.CLIENT_URL || "http://localhost:5173";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Middleware
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ✅ Create HTTP + WebSocket Server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST"],
  },
  transports: ["websocket"], // ✅ Prevent polling issue
});

// ✅ Attach socket instance globally
app.set("io", io);

// ✅ Socket.IO events
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);
  socket.on("disconnect", (reason) => {
    console.log("🔴 Socket disconnected:", socket.id, "Reason:", reason);
  });
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

// ✅ Health route
app.get("/", (req, res) => {
  res.send("🌍 CleanStreet Backend is running successfully!");
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("🌋 Global Error:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// ✅ Graceful Shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🛑 MongoDB disconnected gracefully");
  process.exit(0);
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
