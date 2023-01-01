const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  title: { type: String },
  description: { type: String },
  content: { type: String },
  image: { data: Buffer, contentType: String },
  date: { type: String },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Bloguser" },
});

const postModel = mongoose.model("EmbifiPosts", postSchema);

module.exports = postModel;
