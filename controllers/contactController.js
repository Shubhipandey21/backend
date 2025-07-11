//@description Get all contacts
//@route GET /api/contacts
//@access Public
const getContacts = (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
};

//@description Create New contacts
//@route POST /api/contacts
//@access Public
const createContact = (req, res) => {
    console.log("The request Body is :", req.body)
    const{name, email, phone} = req.body;
    if(!name || !email || !phone){
     res.status(400);
     throw new Error("All fields are mandatory");
    }
  res.status(201).json({ message: "Create Contact" });
};

//@description GET Individual contacts
//@route GET /api/contacts/:id
//@access Public
const getContact = (req, res) => {
  res.status(200).json({ message: `Get Contact for ${req.params.id}` });
};

//@description Update contacts
//@route PUT /api/contacts/:id
//@access Public
const updateContact = (req, res) => {
  res.status(200).json({ message: `Update Contact for ${req.params.id}` });
};

//@description Delete contacts
//@route Delete /api/contacts/:id
//@access Public
const deleteContact = (req, res) => {
  res.status(200).json({ message: `Delete Contact for ${req.params.id}` });
};
module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
