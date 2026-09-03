const validator = require("validator");

const validateData = (req) => {
  const { firstName, lastName, emailId, password, gender, age, about, skills } =
    req;

  if (!firstName || !lastName) {
    throw new Error("Name is required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please enter valid email address");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Give a strong password");
  }
};

module.exports = {
  validateData,
};
