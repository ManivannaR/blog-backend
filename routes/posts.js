const router = require("express").Router();
const Post = require("../models/posts.js");
const upload = require("../middlewares/posts");
const fs = require("fs");
const BSON = require("bson");

router.post("/post", upload.single("image"), async (req, res) => {
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
    });
    await post.save();
    res.status(200).json({ status: "Success" });
  } catch (e) {
    res.status(400).json({ status: "Failed", message: e.message });
  }
});

router.get("/post", async (req, res) => {
  try {
    const data = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json({ status: "Success", data: data });
  } catch (e) {
    res.status(400).json({ status: "Failed", message: e.message });
  }
});

router.get("/post/:id", async (req, res) => {
  const data = await Post.findOne({ _id: BSON.ObjectId(req.params.id) });
  res.status(200).json({
    status: "Success",
    data: data,
  });
});

module.exports = router;
