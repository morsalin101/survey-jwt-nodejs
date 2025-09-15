import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authHandler from "./auth-handler.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Firebase JWT Authentication Server for Hasura",
    status: "running",
    endpoints: {
      auth: "/auth",
      health: "/"
    }
  });
});

// Authentication endpoint for Hasura webhook
app.post("/auth", authHandler);

// Also support GET for testing (though Hasura typically uses POST)
app.get("/auth", authHandler);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({ message: "Internal server error" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Authentication server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/`);
  console.log(`🔐 Auth endpoint: http://localhost:${PORT}/auth`);
  console.log(`🔥 Firebase Project ID: ${process.env.FIREBASE_PROJECT_ID || 'NOT SET'}`);
});

export default app;