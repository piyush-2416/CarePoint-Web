import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email:String,
  age:Number
});

const Product = mongoose.model("Product", userSchema);

export default Product;