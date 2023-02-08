const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

const getContactsController = async (req, res) => {
  const data = await listContacts();
  res.json(data);
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (!data) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json(data);
};

const addContactController = async (req, res) => {
  const data = await addContact(req.body);
  res.status(201).json(data);
};

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);
  if (!data) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json({ message: "Contact deleted" });
};

const updateContactController = async (req, res) => {
  const { contactId } = req.params;

  const data = await updateContact(contactId, req.body);

  if (!data) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.status(200).json(data);
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
};
