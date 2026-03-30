// import jwt from "jsonwebtoken";
const jwt = require("jsonwebbtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.Startswith("Bearer ")) {
    return res.status(401).json({ message: "token not provided" });
  }

  const token = authHeader.split(" ")[1]; //  take the token after the "Bearere token"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded payload that contains the user id
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
