const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

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

//特定の投稿を取得
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(403).json(err);
  }
});

//特定の投稿にいいねを押す
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        $push: {
          likes: req.body.userId,
        },
      });
      return res.status(200).json("いいねをしました");
    } else {
      await post.updateOne({
        $pull: {
          likes: req.body.userId,
        },
      });
      return res.status(403).json("いいねを外しました");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//タイムラインの投稿を取得
router.get("/timeline/all", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendsPosts = await Promise.all(
      currentUser.followings.map((frinendId) => {
        return Post.find({ userId: frinendId });
      })
    );
    return res.status(200).json(userPosts.concat(...friendsPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
