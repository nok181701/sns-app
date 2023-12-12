const router = require("express").Router();
const Post = require("../models/Post");

//投稿の作成
router.post("/", async (req, res) => {
  const newPsot = new Post(req.body);
  try {
    const savedPost = await newPsot.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//投稿の編集
router.put("/:id", async (req, res) => {
  try {
    const prevPost = await Post.findById(req.params.id);
    const currentPost = req.body;
    if (prevPost.userId === currentPost.userId) {
      await prevPost.updateOne({ $set: req.body });
      return res.status(200).json("投稿を編集しました");
    } else {
      return res.status(403).json("他のユーザーの投稿は編集できません");
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

//投稿の削除
router.delete("/:id", async (req, res) => {
  try {
    const prevPost = await Post.findById(req.params.id);
    const currentPost = req.body;
    if (prevPost.userId === currentPost.userId) {
      await prevPost.deleteOne();
      return res.status(200).json("投稿を削除しました");
    } else {
      return res.status(403).json("他のユーザーの投稿は削除できません");
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

module.exports = router;
