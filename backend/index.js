const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const uploadRouter = require("./routes/upload");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 5000;
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

const allowed_origins = [
  "https://sns-app-phi.vercel.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: allowed_origins,
    credentials: true,
  })
);
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/upload", uploadRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`ポート${PORT}で受付中...`);
});
