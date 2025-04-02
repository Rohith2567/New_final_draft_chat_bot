const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/product");

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure "uploads/" folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Route for adding a product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("Incoming request: POST /api/products");
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file ? req.file.filename : "No file uploaded");

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required!" });
    }

    const { name, email, phone, location, originalPrice, discountPrice ,productName,date,description} = req.body;
    const image = req.file.filename;

    if (!name || !email || !phone || !location || !originalPrice || !discountPrice ||!productName ||!date||!description) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newProduct = new Product({
      name,
      email,
      phone,
      location,
      originalPrice,
      discountPrice,
      productName,
      date,
      description,
      image
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});





router.get("/", async (req, res) => {
    try {
      const products = await Product.find(); // Retrieve all products
      res.status(200).json(products);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Server error", details: error.message });
    }
  });

module.exports = router;
