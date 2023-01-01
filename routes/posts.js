const router = require("express").Router();
const Post = require("../models/posts.js");
const upload = require("../middlewares/posts");
const fs = require("fs");
const BSON = require("bson");

router.post("/user/posts", upload.single("image"), async (req, res) => {
  try {
    const { name, email, title, content, description, image, date } = req.body;
    const post = new Post({
      name: name,
      email: email,
      title: title,
      content: content,
      description: description,
      image: {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: "image/png",
      },
      date: date,
      user: req.user,
    });
    await post.save();
    res.status(201).json({ message: "Post added" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/user/posts", async (req, res) => {
  try {
    const data = await Post.find({ user: req.user }).sort({ createdAt: -1 });
    res.status(200).json({ data: data });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.get("/user/posts/:id", async (req, res) => {
  try {
    const data = await Post.findOne({ _id: BSON.ObjectId(req.params.id) });
    res.status(200).json({
      data: data,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
