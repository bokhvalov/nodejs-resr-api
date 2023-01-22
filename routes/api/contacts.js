const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const router = express.Router();

// joi validation schems
const newContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(15).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(9).max(15).required(),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(15),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().min(9).max(15),
});




router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.json(data);
});


router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (!data) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json(data);
});


router.post("/", async (req, res, next) => {
  const { error, value } = newContactSchema.validate(req.body);
  console.log(error);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  const data = await addContact(value);
  res.status(201).json(data);
});


router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);
  if (!data) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json({ message: "Contact deleted" });
});


router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const { error, value } = contactUpdateSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  const data = await updateContact(contactId, value);

  if (!data) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json(data);
});

module.exports = router;
