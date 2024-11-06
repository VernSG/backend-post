const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String, required: true },
  tags: [{ type: String }],
  content: { type: String, required: true },
});

module.exports = mongoose.model("Post", postSchema);
