const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

// @desc Get All Contacts
// @route GET /api/contacts
// @access public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc Create Contacts
// @route POST /api/contacts
// @access public
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});

// @desc Get Contact
// @route GET /api/contacts/:id
// @access public
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact Not Found');
  }
  res.status(200).json(contact);
});

// @desc Update Contact
// @route PUT /api/contacts/:id
// @access public
const updateContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact Not Found');
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('No Permission For Update');
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  res.status(200).json(updatedContact);
});

// @desc Delete Contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  console.log(contact);
  if (!contact) {
    res.status(404);
    throw new Error('Contact Not Found');
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('No Permission For Delete');
  }

  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContactById,
  updateContactById,
  deleteContactById,
};
