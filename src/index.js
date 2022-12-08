import express from "express";
import rewardRoutes from "./routes/todo.route.js";
import authRoutes from "./routes/auth.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/todos", rewardRoutes);
app.use("/auth", authRoutes);

mongoose.connect(`${process.env.MONGO_URI}`);

const db = mongoose.connection;
db.once("open", () => console.log("Connected to Mongo DB!!"));
db.on("error", (error) => console.error(error));

app.listen(PORT, () =>
  console.log(`The server is up and running on PORT ${PORT} 🚀`)
);
