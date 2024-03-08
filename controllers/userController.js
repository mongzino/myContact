import User from "../models/user.js";
import Contact from "../models/contact.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getRegister = (req, res) => {
  res.status(200).render("register");
};

export const postResister = async (req, res) => {
  const { userId, password, password2 } = req.body;
  if (password === password2) {
    try {
      await User.create({ userId, password });
      res.status(200).redirect("/");
    } catch (error) {
      console.log(error);
      res.send("404");
    }
  } else res.send("wrong password");
};

export const getLogin = (req, res) => {
  res.status(200).render("home");
};

export const postLogin = async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne({ userId });
  if (!user) return res.status(401).json({ message: "can not find user" });
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword)
    return res.status(401).json({ message: "wrong password" });
  const contacts = await Contact.find();
  const token = jwt.sign({ id: user._id }, process.env.DB_URL);
  res.cookie("token", token, { httpOnly: true });
  res.status(200).render("index", { contacts });
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};
