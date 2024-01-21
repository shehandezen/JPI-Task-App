const mongoose = require("mongoose");

const User = new mongoose.Schema({
  UserName: {
    required: true,
    type: String,
  },
  Image: String,
  Email: String,
  PhoneNumber: String,
  FirstName: String,
  LastName: String,
  Role: {
    required: true,
    type: String,
  },
  Password: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("User", User);
