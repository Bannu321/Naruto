import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
const router = express.Router();

// Register Route

// router.post("/register", async (req, res) => {
export const register = async (req, res) => {
  const { name, age, password } = req.body;
  try {
    const usr = await User.findOne({ name });
    if (usr) {
      return res.status(400).json("User already exists");
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
};

// Login Route

// router.post("/login", async (req, res) => {
export const login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const usr = await User.findOne({ name });

    if (!usr) {
      return res.status(401).send("Invalid Credentials");
    }

    if (await usr.comparePassword(password)) {
      const access_token = jwt.sign(
        { id: usr._id }, // payload
        process.env.JWT_ACCESS_SECRET, // secret key
        { expiresIn: "15m" }, // expire time
      );

      const refresh_token = jwt.sign(
        { id: usr._id }, // payload
        process.env.JWT_REFRESH_SECRET, // secret key
        { expiresIn: "7d" }, // expire time
      );

      // We store the access tokens only in the http only cookie,
      // as it is the place js cannot access,
      // and it will be sent automatically with every request to the server,
      // so we can verify the user on the server side.

      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.status(200).json({
        access_token,
        user: {
          id: usr.id,
          name: usr.name,
          age: usr.age,
          level: usr.level,
          xp: usr.xp,
        },
      });
      // return res.status(200).send({
      //   message: "Login successful",
      //   user: {
      //     id: usr._id,
      //     name: usr.name,
      //     age: usr.age,
      //     level: usr.level,
      //     xp: usr.xp,
      //   },
      // });
    }
    return res.status(401).send("Invalid Credentials");
  } catch (err) {
    console.log("Server error: " + err);
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAccessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" },
    );

    res.status(200).json({
      access_token: newAccessToken,
      user: {
        id: user._id,
        name: user.name,
        age: user.age,
        level: user.level,
        xp: user.xp,
      },
    });
  } catch (err) {
    console.error("Error refreshing token: ", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  } catch (err) {
    console.error("Error logging out: ", err);
    return res.status(500).json({ message: "Server error" });
  }
};



router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refreshToken", refreshToken);


export default router;