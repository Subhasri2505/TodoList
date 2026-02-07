import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import todoRoutes from "./routes/todoRoutes.mjs";

// Load correct env file
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: envFile });

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/Todolist";

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB:", mongoURI))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/todos", todoRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
