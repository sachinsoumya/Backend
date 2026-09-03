const mongoose = require("mongoose");
const validator = require("validator");

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
      validate(value) {
        const flag = validator.isEmail(value);
        if (!flag) {
          throw new Error("Please enter valid email address");
        }
      },
    },

    password: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please Give a strong password");
        }
      },
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
      validator(value) {
        if (value.length > 10 && value.length < 1) {
          throw new Error("Skills should be between 1 to 10");
        }
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
