import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return ;
  try {
    this.password = await bcrypt.hash(this.password, 10); // Hash with 10 salt rounds
    
  } catch (err) {
  
  }
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);


export default User;