const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const uploadRouter = require("./routes/upload");
const mongoose = require("mongoose");
const path = require("path");
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
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/upload", uploadRouter);

app.listen(5000, () => {
  console.log("ポート3000で受付中...");
});
