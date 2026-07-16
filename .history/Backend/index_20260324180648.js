import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// const Database="school"
// collection="student"
 dotenv.config();

const app = express();

// const client =  new MongoClient(MONGODB_URI);
// client.connect().then(()=>{
//   console.log("....connected.....");
// })
// async function dbConnection(){
//   const db=client.db(Database)
//     const collectResult=db.collection(collection);
//     const result=await collectResult.find().toArray();
//     console.log(result);
  
// }
// dbConnection()

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
 