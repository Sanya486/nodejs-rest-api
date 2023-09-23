const express = require("express");
const router = express.Router();
const contacts = require("../../controllers/contacts");
const { isValidId, validateBody } = require("../../middlewares")
const { validation } = require('../../utils')
const {authenticate} = require('../../middlewares')


router.get("/", authenticate, contacts.listContacts);

router.get("/:contactId", isValidId, contacts.getContactById);

router.post("/", authenticate, validateBody(validation.postSchema), contacts.addContact);

router.delete("/:contactId", authenticate, isValidId, contacts.removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(validation.putSchema),
  contacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(validation.favoriteFieldSchema),
  contacts.updateStatusContact
);

module.exports = router;
