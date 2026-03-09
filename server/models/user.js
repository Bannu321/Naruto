const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
    min: [0, "Age cannot be negative"],
  },

  level: {
    type: Number,
    required: true,
    default: 1,
  },

  xp: {
    type: Number,
    required: true,
    default: 0,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10); // Hash with 10 salt rounds
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", UserSchema);
