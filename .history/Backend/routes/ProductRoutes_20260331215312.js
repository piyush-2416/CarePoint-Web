import express from "express";
import Product from "./models/Product.js";

const router = express.Router();

// ✅ Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ✅ Get single product
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

export default router;