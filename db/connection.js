const mongoose = require("mongoose");

connectMongo().catch((err) => console.log(err));

async function connectMongo() {
  await mongoose.connect(
    "mongodb+srv://nodejs:nodejs1234@phonebook.9dqsl1q.mongodb.net/?retryWrites=true&w=majority"
  );
}

module.exports = {
  connectMongo,
};
