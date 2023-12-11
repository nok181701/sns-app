const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const mongoose = require("mongoose");
require("dotenv").config();

//DB 接続
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("DBと接続中...");
  })
  .catch((err) => {
    console.log(`エラー：${err}`);
  });

//Middleware
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.listen(3000, () => {
  console.log("ポート3000で受付中...");
});
