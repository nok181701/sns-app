const router = require("express").Router();
const User = require("../models/User");

//ユーザー情報取得
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(`取得できませんでした：${err}`);
  }
});

//クエリでユーザー情報取得
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username });
    const { password, updatedAt, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(`取得できませんでした：${err}`);
  }
});

//ユーザー情報更新
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdomin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      return res.status(200).json("ユーザー情報が更新されました");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("自分のアカウントのみ更新できます");
  }
});

//ユーザー情報削除
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdomin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("ユーザー情報が削除されました");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("自分のアカウントのみ削除できます");
  }
});

// ユーザーのフォロー
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const curUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $push: {
            followers: req.body.userId,
          },
        });
        await curUser.updateOne({
          $push: {
            followings: req.params.id,
          },
        });
        return res.status(200).json("フォローしました");
      } else {
        return res.status(403).json("すでにこのユーザーをフォローしています");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("自分自身はフォローできません");
  }
});

// ユーザーのフォロー解除
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const curUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $pull: {
            followers: req.body.userId,
          },
        });
        await curUser.updateOne({
          $pull: {
            followings: req.params.id,
          },
        });
        return res.status(200).json("フォローを解除しました");
      } else {
        return res.status(403).json("このユーザをフォロー解除できません");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("自分自身はフォロー解除できません");
  }
});

module.exports = router;
