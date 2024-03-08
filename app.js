import express from "express";
// import {} from "./middleware.js";
import dbConnect from "./config/dbConnect.js";
import MethodOverride from "method-override";
import contactRouter from "./routers/contactRouter.js";
import userRouter from "./routers/userRouter.js";

const app = express();
const port = 3000;
dbConnect();

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/views");

app.use(express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(MethodOverride("_method"));

app.use("/", userRouter);
app.use("/contacts", contactRouter);

app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 실행 중 🚀`);
});
