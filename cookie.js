import express from "express";
import cookieParser from "cookie-parser";

const app = express();

const port = 3000;

app.use(cookieParser());

app.get("/", (req, res) => {
  res.cookie("coogie", "cookie made by newjeans", { httpOnly: true });
  res.send("cookie!");
});

app.get("/cookie", (req, res) => {
  console.log(req.cookies);
  res.send("cookies!");
});

app.get("/deleteCookie", (req, res) => {
  res.clearCookie("coogie");
  res.send("no cookie :(");
});
app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 실행 중 🚀`);
});
