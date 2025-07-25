const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@description Get all contacts
//@route GET /api/contacts
//@access Private
const getContacts =asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
}) ;

//@description Create New contacts
//@route POST /api/contacts
//@access Private
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
      user_id: req.user.id,
    });
  res.status(201).json(contact);
});

//@description GET Individual contacts
//@route GET /api/contacts/:id
//@access Private
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
//@access Private
const updateContact =asyncHandler (async (req, res) => {
   const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error ("Contact not found");
  }

  if(contact.user_id.toString()!== req.user.id){
    res.status(403);
    throw new Error("User Donot have permission to update this contact");
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
//@access Private
const deleteContact = asyncHandler(async (req, res) => {
   const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error ("Contact not found");
  }
  if(contact.user_id.toString()!== req.user.id){
    res.status(403);
    throw new Error("User Donot have permission to update this contact");
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
