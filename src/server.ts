import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import boardRoutes from "./board.routes";
import authRoutes from "./auth.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/boards", boardRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ message: "API is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});