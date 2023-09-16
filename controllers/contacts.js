const Contact = require('../models/contact')
const ctrlWrapper = require('../utils/ctrlWrapper')
const errorHandler = require("../utils/errorHandler");

const listContacts = async (req, res) => {
  const contacts = await Contact.find()
  res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  const {contactId} = req.params
  const contact = await Contact.findById(contactId);
  if (!contact) {
    errorHandler(404, "Not found");
  }
  res.status(200).json(contact);
};

const addContact = async (req, res) => {
  const addedContact = await Contact.create(req.body);
  res.status(201).json(addedContact);
};

const removeContact = async (req, res) => {
  const contact = await Contact.findByIdAndRemove(req.params.contactId);
  if (!contact) {
    errorHandler(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
  return contact;
};


const updateContact = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
  if (!contact) {
    errorHandler( 404, "Not found");
  }
      res.status(200).json(contact);
};

const updateStatusContact = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!contact) {
    errorHandler(404, "Not found");
  }
  res.status(200).json(contact);
};


module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};