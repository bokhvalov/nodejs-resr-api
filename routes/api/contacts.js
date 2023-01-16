const express = require('express')
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts')

const router = express.Router()

router.get('/', async (req, res, next) => {
  const data = await listContacts()
  res.json({
    status: 'success',
    code: 200,
    data,
  });
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId)
  res.json({
    status: 'success',
    code: 200,
    data,
  });
})

router.post('/', async (req, res, next) => {
  const data = await addContact(req.body)
  res.json({
    status: 'success',
    code: 201,
    data,
  });
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId)
  res.json({
    status: 'success',
    code: 200,
    data
  });
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const data = await updateContact(contactId,req.body)
  res.json({
    status: 'success',
    code: 200,
    data,
  });
})

module.exports = router
