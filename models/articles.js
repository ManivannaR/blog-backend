const mongoose = require("mongoose");

const articlesSchema = new mongoose.Schema({
  author: { type: String },
  title: { type: String },
  description: { type: String },
  content: { type: String },
  url: { type: String },
  imageUrl: { data: Buffer, contentType: String },
  publishedAt: { type: String },
});

const articlesModel = mongoose.model("Articles", articlesSchema);

module.exports = articlesModel;
