import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import newsletterRoutes from "./routes/newsletter.js";
import generatorRoutes from "./routes/generator.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Setup Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets if in production
// (Left open for future build deployments)

// Mount API Routes
app.use("/api/auth", authRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/generator", generatorRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

// Default 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found.` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled server error:", err);
  res.status(500).json({ error: "Internal registry server breakdown occurred." });
});

// Initialize DB and start server
const startServer = async () => {
  console.log("Initializing database tables...");
  await initDB();

  app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`  Smart Reuse Backend Registry Started  `);
    console.log(`  Port: ${PORT}                          `);
    console.log(`  Environment: development               `);
    console.log(`=========================================`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server application:", error);
  process.exit(1);
});
