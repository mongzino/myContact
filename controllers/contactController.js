import Contact from "../models/contact.js";
import asyncHandler from "express-async-handler";

export const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).render("index", { contacts });
});

// export const createContact = asyncHandler(async (req, res) => {
//   const { name, email, phone } = req.body;
//   if (!name || !email || !phone) {
//     res.status(400).send("there is no data");
//   }
//   await Contact.create({ name, email, phone });
//   res.status(201).send("Create Contacts");
// });

export const getContact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.status(200).render("update", { contact });
  } catch (error) {
    console.log(error);
    res.status(404).send("data is not found");
  }
});

export const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const contact = await Contact.findByIdAndUpdate(id, { name, email, phone });
    res.status(200).redirect("/contacts");
  } catch (error) {
    console.log(error.message);
    res.status(404).send("data is not found");
  }
});

export const deleteContact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    res.status(200).redirect("/contacts");
  } catch (error) {
    console.log(error.message);
    res.status(404).send("data is not found");
  }
});

export const getAdd = (req, res) => {
  res.status(200).render("add");
};

export const postAdd = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    await Contact.create({
      name,
      email,
      phone,
    });
    res.status(200).redirect("/contacts");
  } catch (error) {
    console.log(error);
  }
};
