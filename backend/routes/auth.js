const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//ユーザー登録
router.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//ログイン
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) return res.status(404).send("ユーザーが見つかりません");
    const vailedPassword = user.password === req.body.password;
    return vailedPassword
      ? res.status(200).json(user)
      : res.status(404).json("パスワードが違います。");
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
