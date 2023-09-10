const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contactsJSON = await fs.readFile(contactsPath, "utf-8");
  const parsedContact = JSON.parse(contactsJSON);
  return parsedContact || null;
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const contact = contactsList.find((contact) => contact.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const contact = contactsList.find((contact) => contact.id === contactId);
  const filteredContacts = contactsList.filter(
    (contact) => contact.id !== contactId
  );
  fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
  return contact || null;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const contactsList = await listContacts();
  const modContacts = [...contactsList, contact];
  fs.writeFile(contactsPath, JSON.stringify(modContacts, null, 2));
  return contact || null;
};

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();
  const contact = contactsList.find((contact) => contact.id === contactId);
  if (!contact) {
    return null;
  }
  const filteredContacts = contactsList.filter(
    (contact) => contact.id !== contactId
  );
  const changedContact = { ...contact, ...body };
  const modContacts = [...filteredContacts, changedContact];
  fs.writeFile(contactsPath, JSON.stringify(modContacts, null, 2));
  return changedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
