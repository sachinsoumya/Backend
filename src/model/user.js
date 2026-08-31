const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },

    lastName: {
      type: String,
    },

    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      unique: true,
    },

    gender: {
      type: String,
      validator(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },

    age: {
      type: Number,
      min: 18,
      max: 60,
    },

    about: {
      type: String,
      default: "This is my about section",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
