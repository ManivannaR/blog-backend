const router = require("express").Router();
const Article = require("../models/articles.js");

router.post("/articles", async (req, res) => {
  try {
    const article = req.body;
    let newArticle = new Article({
      author: article.author,
      title: article.title,
      description: article.description,
      content: article.content,
      url: article.url,
      imageUrl: article.urlToImage,
      publishedAt: article.publishedAt,
    });
    await newArticle.save();
    res.status(201).json({ message: "Article added" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/articles", async (req, res) => {
  try {
    const page = req.query.page * 18;
    const data = await Article.find()
      .limit(18)
      .skip(page)
      .sort({ publishedAt: -1 });
    res.status(200).json({ message: "Success", data: data });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
