const Contact = require("../models/contact");
const ctrlWrapper = require("../utils/ctrlWrapper");
const errorHandler = require("../utils/errorHandler");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  console.log(1);
  const contacts = await Contact.find(
    { owner, ...req.query },
    "-createdAt -updatedAt",
    { skip, limit }
  ).populate("owner", "email");
  console.log(2);
  res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const contact = await Contact.find({ _id: contactId, owner });
  if (!contact) {
    errorHandler(404, "Not found");
  }
  res.status(200).json(contact);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const addedContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(addedContact);
};

const removeContact = async (req, res) => {
  const { _id: owner } = req.user;
  const contact = await Contact.findOneAndRemove({
    _id: req.params.contactId,
    owner,
  });
  if (!contact) {
    errorHandler(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
  return contact;
};

const updateContact = async (req, res) => {
  const { _id: owner } = req.user;
  const contact = await Contact.findOneAndUpdate(
    { _id: req.params.contactId, owner },
    req.body,
    { new: true }
  );
  if (!contact) {
    errorHandler(404, "Not found");
  }
  res.status(200).json(contact);
};

const updateStatusContact = async (req, res) => {
  const { _id: owner } = req.user;
  const contact = await Contact.findOneAndUpdate(
    { _id: req.params.contactId, owner },
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
