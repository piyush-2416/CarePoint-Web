// import express from "express";
// import { MongoClient } from "mongodb";
// import dotenv from "dotenv";
// import cors from "cors";
// const MONGODB_URI="mongodb+srv://wwwpiyushverma2401_db_user:N3hTB85tx.xnStG@piyush2416.sp9zipj.mongodb.net/?appName=Piyush2416"
// const Database="Products"
// const collection="Products-items"

// dotenv.config();
   
// const app = express();
// app.use(cors()); // React ko allow karega

// const PORT = process.env.PORT || 3000;

// const client = new MongoClient(MONGODB_URI);

// // 🔥 Connect DB once
// let db;

// async function connectDB() {
//   try {
//     await client.connect();
//     console.log("✅ MongoDB Connected");

//     db = client.db(Database); // 👈 apna database name
//   } catch (error) {
//     console.log("❌ DB Error:", error);
//   }
// }

// connectDB();

// // 🔥 API Route (IMPORTANT)
// app.get("/api/students", async (req, res) => {
//   try {
//     const data = await db
//       .collection(collection) // 👈 apna collection name
//       .find()
//       .toArray();

//     res.json(data); // 👈 React ko data bhej raha hai
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// // Server start
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });

/* this is starting */

import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
    import { ObjectId } from "mongodb"; // top pe

const MONGODB_URI = "mongodb+srv://wwwpiyushverma2401_db_user:N3hTB85tx.xnStG@piyush2416.sp9zipj.mongodb.net/?appName=Piyush2416"; // apna URI daalo
const Database = "hospital-data";
const collection = "Doctors-data";

dotenv.config();

const app = express();
app.use(cors()); // React ko allow karega
app.use(express.json());

const PORT = process.env.PORT || 3000;

const client = new MongoClient(MONGODB_URI);

// // 🔥 Connect DB once
let db;
async function connectDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB Connected");
    db = client.db(Database); // 👈 apna database name
  } catch (error) {
    console.log("❌ DB Error:", error);
  }
}

connectDB();

// // ✅ Route 1: Saare products lao (Home page ke liye)
app.get("/api/products", async (req, res) => {
  try {
    const data = await db
      .collection(collection)
      .find()
      .toArray();
db=client.db(Database);
    res.json(data); // React ko data bhej raha hai
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// // ✅ Route 2: Single product by ID (Product detail page ke liye)
app.get("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Pehle ObjectId se try karo
    let product = null;

    try {
      const { ObjectId } = await import("mongodb");
      if (ObjectId.isValid(productId)) {
        product = await db
          .collection(collection)
          .findOne({ _id: new ObjectId(productId) });
      }
    } catch (e) {}

    // Agar nahi mila toh string ID se try karo
    if (!product) {
      product = await db
        .collection(collection)
        .findOne({ _id: productId });
    }

    // Agar phir bhi nahi mila toh kisi aur field se try karo
    if (!product) {
      product = await db
        .collection(collection)
        .findOne({ id: productId });
    }

    if (!product) {
      return res.status(404).json({ error: "Product nahi mila!" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// import express from "express";
// import { MongoClient, ObjectId } from "mongodb";
// import dotenv from "dotenv";
// import cors from "cors";

// dotenv.config();

// const MONGODB_URI =
//   process.env.MONGODB_URI ||
//   "mongodb+srv://wwwpiyushverma2401_db_user:N3hTB85tx.xnStG@piyush2416.sp9zipj.mongodb.net/?appName=Piyush2416";
// const DATABASE_NAME = "Food-data";
// const COLLECTION_NAME = "Food-items";

// const app = express();
// const PORT = process.env.PORT || 3000;

// // ─── Middleware ───────────────────────────────────────────────
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "http://localhost:3000",
//       "http://127.0.0.1:5173",
//     ],
//     credentials: true,
//   }),
// );
// app.use(express.json());

// // ─── DB Connection ────────────────────────────────────────────
// const client = new MongoClient(MONGODB_URI);
// let db;

// async function connectDB() {
//   try {
//     await client.connect();
//     db = client.db(DATABASE_NAME);
//     console.log("✅ MongoDB Atlas Connected!");
//   } catch (err) {
//     console.error("❌ MongoDB Connection Error:", err.message);
//     process.exit(1);
//   }
// }

// const col = () => db.collection(COLLECTION_NAME);

// // ─── HELPER: ObjectId ya String _id dono handle karo ─────────
// async function findById(id) {
//   // Try 1: ObjectId format (nayi documents ke liye)
//   if (ObjectId.isValid(id)) {
//     const doc = await col().findOne({ _id: new ObjectId(id) });
//     if (doc) return { doc, query: { _id: new ObjectId(id) } };
//   }
//   // Try 2: Plain string _id (purani documents ke liye)
//   const doc = await col().findOne({ _id: id });
//   if (doc) return { doc, query: { _id: id } };

//   return { doc: null, query: null };
// }

// // ─── ROUTES ───────────────────────────────────────────────────

// // 📌 READ ALL - GET /api/products
// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await col().find().toArray();
//     res.json({ success: true, count: products.length, data: products });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// // 📌 READ ONE - GET /api/products/:id
// app.get("/api/products/:id", async (req, res) => {
//   try {
//     const { doc } = await findById(req.params.id);
//     if (!doc)
//       return res
//         .status(404)
//         .json({ success: false, error: "Product not found" });
//     res.json({ success: true, data: doc });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// // 📌 CREATE - POST /api/products
// app.post("/api/products", async (req, res) => {
//   try {
//     const { name, price, category, description, image, stock } = req.body;

//     if (!name || !price || !category) {
//       return res.status(400).json({
//         success: false,
//         error: "Name, price aur category required hain!",
//       });
//     }

//     const newProduct = {
//       name: name.trim(),
//       price: parseFloat(price),
//       category: category.trim(),
//       description: description?.trim() || "",
//       image: image?.trim() || "",
//       stock: parseInt(stock) || 0,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };

//     const result = await col().insertOne(newProduct);
//     res.status(201).json({
//       success: true,
//       message: "Product create ho gaya! ✅",
//       data: { _id: result.insertedId, ...newProduct },
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// // 📌 UPDATE - PUT /api/products/:id
// app.put("/api/products/:id", async (req, res) => {
//   try {
//     // ✅ FIX 1: Pehle document dhundo sahi query ke saath
//     const { doc, query } = await findById(req.params.id);
//     if (!doc)
//       return res
//         .status(404)
//         .json({ success: false, error: "Product not found" });

//     const { name, price, category, description, image, stock } = req.body;

//     const updatedFields = {
//       ...(name !== undefined && { name: name.trim() }),
//       ...(price !== undefined && { price: parseFloat(price) }),
//       ...(category !== undefined && { category: category.trim() }),
//       ...(description !== undefined && { description: description.trim() }),
//       ...(image !== undefined && { image: image.trim() }),
//       ...(stock !== undefined && { stock: parseInt(stock) }),
//       updatedAt: new Date(),
//     };

//     // ✅ FIX 2: MongoDB v5+ mein findOneAndUpdate directly document return karta hai
//     const updatedDoc = await col().findOneAndUpdate(
//       query,
//       { $set: updatedFields },
//       { returnDocument: "after" },
//     );

//     res.json({
//       success: true,
//       message: "Product update ho gaya! ✅",
//       data: updatedDoc, // ✅ .value nahi chahiye ab
//     });
//   } catch (err) {
//     console.error("PUT Error:", err.message);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// // 📌 DELETE - DELETE /api/products/:id
// app.delete("/api/products/:id", async (req, res) => {
//   try {
//     // ✅ FIX: Pehle document dhundo, phir delete karo sahi query se
//     const { doc, query } = await findById(req.params.id);
//     if (!doc)
//       return res
//         .status(404)
//         .json({ success: false, error: "Product not found" });

//     await col().deleteOne(query);
//     res.json({ success: true, message: "Product delete ho gaya! 🗑️" });
//   } catch (err) {
//     console.error("DELETE Error:", err.message);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// // ─── Start Server ─────────────────────────────────────────────
// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`\n🚀 Server running at http://localhost:${PORT}`);
//     console.log(`📦 CRUD Routes:`);
//     console.log(`   GET    /api/products`);
//     console.log(`   GET    /api/products/:id`);
//     console.log(`   POST   /api/products`);
//     console.log(`   PUT    /api/products/:id`);
//     console.log(`   DELETE /api/products/:id\n`);
//   });
// });
