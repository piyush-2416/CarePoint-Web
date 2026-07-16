import express from "express"
import Product from "../models/Product.js";
 import Products from "./Routes/ProductRoutes"

// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET single product by ID
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

module.exports = router;