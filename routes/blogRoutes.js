const express = require("express");
const BlogPost = require("../models/BlogPost");
const router = express.Router();

// ✅ Get all blog posts (latest first)
router.get("/", async (req, res) => {
  const posts = await BlogPost.find().sort({ date: -1 });
  res.json(posts);
});

// ✅ Add a new blog post
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

// ✅ Update a blog post by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Delete a blog post by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
