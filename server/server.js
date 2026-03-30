import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5010;

import AuthRoute from "./routes/Authentication.js";
import CURDRoute from "./routes/CRUD.js";

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Running Server For Naruto To-Do List");
});

app.use("/auth", AuthRoute);
app.use("/tasks", CURDRoute);

app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port ${port}`);
});
