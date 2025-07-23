// models/BlogPost.js (Node.js with Mongoose)
const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String, // URL from Cloudinary or other source
  category: String,
  date: { type: Date, default: Date.now },
  slug: { type: String, unique: true },
});

module.exports = mongoose.model("BlogPost", blogPostSchema);
