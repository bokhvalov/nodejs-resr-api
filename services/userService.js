const { User } = require("../db/UserModel");

async function addUser(reqBody) {
    const newContact = new Contact(reqBody);
  
    const result = await newContact.save();
    return result;
  }
  
  module.exports ={addUser}

  https://masteringjs.io/tutorials/mongoose/unique