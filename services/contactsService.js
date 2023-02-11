const { Contact } = require("../db/contactModel");

async function getContacts() {
  const listOfContacts = await Contact.find();
  return listOfContacts;
}

async function getContactById(contactId) {
  const contact = await Contact.findOne({ _id: contactId });
  if (contact) return contact;
}

async function removeContact(contactId) {
  const contact = await Contact.findOneAndDelete({ _id: contactId });
  if (contact) return contact;
}

async function addContact(reqBody) {
  const newContact = new Contact(reqBody);

  const result = await newContact.save();
  return result;
}

async function updateContact(contactId, body) {
  const contactToBeUpdated = Contact.findByIdAndUpdate(
    { _id: contactId },
    body,
    { returnDocument: "after" }
  );
  if (contactToBeUpdated) return contactToBeUpdated;
}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
