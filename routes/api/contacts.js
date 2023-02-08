const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
} = require("../../controllers/contactsController");
const {
  newContactValidaion,
  updatedContactValidation,
} = require("../../middlewares/validationMiddleware");
const router = express.Router();


router.get("/", getContactsController);
router.get("/:contactId", getContactByIdController);
router.post("/", newContactValidaion, addContactController);
router.delete("/:contactId", removeContactController);
router.put("/:contactId", updatedContactValidation, updateContactController);


module.exports = router;
