const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");

const MDB_URI = "mongodb://127.0.0.1:27017/NarutoDB";

mongoose
  .connect(MDB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: " + err);
  });

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

// const users = [];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  const { name, age, password } = req.body;
  try {
    const usr = await User.findOne({ name });
    if (usr) {
      return res.status(409).send("User already exists");
    }

    const newUser = await User.create({
      name,
      password,
      age,
    });

    res.send({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        age: newUser.age,
        level: newUser.level,
        xp: newUser.xp,
      },
    });
  } catch (err) {
    console.log("Server error: " + err);
    res.status(500).send("Server error");
  }
});

app.post("/login", async (req, res) => {
  const { name, password } = req.body;
  try {
    const usr = await User.findOne({ name });

    if (!usr) {
      return res.status(401).send("Invalid Credentials");
    }

    if (await usr.comparePassword(password)) {
      return res.status(200).send({
        message: "Login successful",
        user: {
          id: usr._id,
          name: usr.name,
          age: usr.age,
          level: usr.level,
          xp: usr.xp,
        },
      });
    }
    return res.status(401).send("Invalid Credentials");
  } catch (err) {
    console.log("Server error: " + err);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
