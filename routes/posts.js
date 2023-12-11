const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello Posts");
});
module.exports = router;
