import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;
const dayTime = 1000 * 3600 * 24;

app.use(cookieParser());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    cookie: { maxAge: dayTime },
  })
);

app.get("/", (req, res) => {
  if (req.session.count) {
    req.session.count++;
    res.send(`${req.session.count}번째 방문입니다.`);
  } else {
    req.session.count = 1;
    res.send("첫 방문을 환영합니다.");
  }
});

app.get("/session", (req, res) => {
  res.send(req.session.cookie);
});

app.get("/delete-session", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.clearCookie("connect.sid");
      res.send("session is deleted");
    }
  });
});

app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 실행 중 🚀`);
});
