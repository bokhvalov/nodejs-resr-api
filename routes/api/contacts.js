const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const router = express.Router();



router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data,
  });
});



router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (!data) {
    errorResponce (res,404,"Not found")
    return;
  }

  res.json({
    status: "success",
    code: 200,
    data,
  });
});



router.post("/", async (req, res, next) => {
  const data = await addContact(req.body);
  res.json({
    status: "success",
    code: 201,
    data,
  });
});


router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);
  if (!data) {
    errorResponce (res,404,"Not found")
    return;
  }

  res.json({
    status: "success",
    code: 200,
    data,
  });
});



router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await updateContact(contactId, req.body);

  if (!data) {
    errorResponce (res,404,"Not found")
    return;
  }

  res.json({
    status: "success",
    code: 200,
    data,
  });
});



const errorResponce = (res, code, message) => {
return (res.json({
  status: "error",
  code,
  message,
}))
}

module.exports = router;
