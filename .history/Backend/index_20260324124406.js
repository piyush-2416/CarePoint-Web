import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
 dotenv.config();

const app = express();


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );

    console.log(`MongoDB Connected:  ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);
app.get("/", (req, res) => {
  res.send("database  is ready");
});

  });
});
 