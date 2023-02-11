const mongoose = require("mongoose");

async function connectMongo() {
  try {
    await mongoose.connect(
      "mongodb+srv://nodejs:nodejs1234@phonebook.9dqsl1q.mongodb.net/db-contacts?retryWrites=true&w=majority"
    );
    console.log("Database connection successful");
  } catch (error) {
    console.log("Database connection error!", error);
    process.exit(1);
  }
}

module.exports = {
  connectMongo,
};
