const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@description Get all contacts
//@route GET /api/contacts
//@access Public
const getContacts =asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
}) ;

//@description Create New contacts
//@route POST /api/contacts
//@access Public
const createContact = asyncHandler (async (req, res) => {
    console.log("The request Body is :", req.body)
    const{name, email, phone} = req.body;
    if(!name || !email || !phone){
     res.status(400);
     throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
      name,
      email,
      phone,
    });
  res.status(201).json(contact);
});

//@description GET Individual contacts
//@route GET /api/contacts/:id
//@access Public
const getContact =asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error ("Contact not found");
  }
  res.status(200).json(contact);
}) ;

//@description Update contacts
//@route PUT /api/contacts/:id
//@access Public
const updateContact =asyncHandler (async (req, res) => {
   const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error ("Contact not found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedContact);
});

//@description Delete contacts
//@route Delete /api/contacts/:id
//@access Public
const deleteContact = asyncHandler(async (req, res) => {
   const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error ("Contact not found");
  }
  await Contact.deleteOne({ _id: req.params.id });
//adding comment to check the commmit
  res.status(200).json(contact);
});
module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
