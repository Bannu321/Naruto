import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected Successfully: ${conn.connection.host}`);
  } catch (err) {
    console.error("Error while connecting to MongoDB: ", err);
    process.exit(1);
  }
};
