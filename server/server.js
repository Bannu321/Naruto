import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = 8080;

// const User = require("./models/user");
// import User from "./models/user.js";
import AuthRoute from "./routes/Authentication.js";

const MDB_URI = "mongodb://127.0.0.1:27017/NarutoDB";

mongoose
  .connect(MDB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: " + err);
    console.error(err);
  });

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", AuthRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
