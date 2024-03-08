import express from "express";
import {
  getAllContacts,
  getContact,
  updateContact,
  deleteContact,
  getAdd,
  postAdd,
} from "../controllers/contactController.js";
import cookieParser from "cookie-parser";
import { checkLogin } from "../middleware.js";

const contactRouter = express.Router();

contactRouter.use(cookieParser());

contactRouter.route("/").get(checkLogin, getAllContacts); //.post(createContact);

contactRouter.route("/add").get(checkLogin, getAdd).post(checkLogin, postAdd);

contactRouter
  .route("/:id")
  .get(checkLogin, getContact)
  .put(checkLogin, updateContact)
  .delete(checkLogin, deleteContact);

export default contactRouter;
