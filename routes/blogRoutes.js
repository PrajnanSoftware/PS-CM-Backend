// routes/blogRoutes.js
const express = require("express");
const BlogPost = require("../models/BlogPost");
const router = express.Router();

// Get all blog posts
router.get("/", async (req, res) => {
  const posts = await BlogPost.find().sort({ date: -1 });
  res.json(posts);
});

// Add a new blog post
router.post("/", async (req, res) => {
  try {
    const { title, description, image, category, date, slug } = req.body;
    const newPost = new BlogPost({ title, description, image, category, date, slug });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
