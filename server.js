require('dotenv').config(); // Pastikan ini ada di sini
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./db");
const Post = require("./models/Post");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Koneksi ke database
connectDB();

// Rute untuk mendapatkan semua posts
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rute untuk menambahkan post baru
app.post("/api/posts", async (req, res) => {
  const post = new Post(req.body);
  try {
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rute untuk mengambil post berdasarkan slug
app.get("/api/posts/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rute untuk memperbarui post
app.put("/api/posts/:slug", async (req, res) => {
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
