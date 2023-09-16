const express = require("express");

const router = express.Router();

const contacts = require("../../controllers/contacts");

const { isValidId, validateBody } = require("../../middlewares")
const {validation} =require('../../utils')


router.get("/", contacts.listContacts);

router.get("/:contactId", isValidId, contacts.getContactById);

router.post("/", validateBody(validation.postSchema), contacts.addContact);

router.delete("/:contactId", isValidId, contacts.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(validation.putSchema),
  contacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(validation.favoriteFieldSchema),
  contacts.updateStatusContact
);

module.exports = router;
