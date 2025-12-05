import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import todoRoutes from "./routes/todoRoutes.js";
import dotenv from "dotenv";
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/todo");
  

// API routes
app.use("/api/todos", todoRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
