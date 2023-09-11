const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

console.log(contactsPath)

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
  const filteredContacts = contactsList.filter(
    (contact) => contact.id !== contactId
  );
  if (filteredContacts.length === contactsList.length) {
    return null
  }
    fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
  return true
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
  contactsList.push(contact)
  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return contact || null;
};

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();
  const contactIndex = contactsList.findIndex((contact) => contact.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  contactsList.splice(contactIndex, 1, { ...contactsList[contactIndex], ...body });
  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return contactsList[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}