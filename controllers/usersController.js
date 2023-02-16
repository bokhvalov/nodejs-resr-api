const { addUser } = require("../services/userService");


const addUserController = async (req, res) => {
    const newContact = await addUser(req.body);
    res.status(201).json(newContact);
  };

  module.exports = {addUserController}
  