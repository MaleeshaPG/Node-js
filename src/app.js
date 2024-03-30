// app.js

const express = require('express');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Connect to MongoDB Atlas (online MongoDB servie)
mongoose.connect('mongodb+srv://maleesha619:Maleesha123@prouduct.cn8oo2g.mongodb.net/?retryWrites=true&w=majority&appName=Prouduct', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Product Schema
const ProductSchema = new mongoose.Schema({
  name: String,
  img_path: String,
  price: Number,
  category: String,
  gender: String,
});

// Create Product model
const Product = mongoose.model('Product', ProductSchema);

// Middleware to parse JSON requests
app.use(express.json());

// Route to get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create product
app.post('/api/products', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    img_path: req.body.img_path,
    price: req.body.price,
    category: req.body.category,
    gender: req.body.gender,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
