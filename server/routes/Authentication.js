import express from "express";
import User from "../models/user.js";
const router = express.Router();

// Register Route

router.post("/register", async (req, res) => {
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

    console.log("User Created: ", newUser);

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
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Login Route

router.post("/login", async (req, res) => {
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
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;
