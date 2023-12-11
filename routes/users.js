const router = require("express").Router();
const User = require("../models/User");

//ユーザー情報取得
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
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
      return res.status(200).json("ユーザー情報が更新されました。");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("自分のアカウントのみ更新できます。");
  }
});

//ユーザー情報削除
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdomin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("ユーザー情報が削除されました。");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("自分のアカウントのみ削除できます。");
  }
});

module.exports = router;
