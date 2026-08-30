const mongoose = require('mongoose');

const user2Schema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },

  age: {
    type: Number,
  },

  emailId: {
    type: String,
    required: true,
  },

  address: {
    type: String,
  },

  gender: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User2", user2Schema);

module.exports = User;
