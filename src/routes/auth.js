const express = require("express");

const router = express.Router();

const { adminAuth, userAuth } = require("../middlewares/auth");

const { validateData } = require("../utils/validate");

const bcrypt = require("bcryptjs");

const cookieParser = require("cookie-parser");

const User = require("../model/user");

router.post("/signup", async (req, res) => {
  try {
    //* Validate the data

    validateData(req.body);

    const {
      firstName,
      lastName,
      emailId,
      password,
      gender,
      age,
      about,
      skills,
    } = req.body;

    //* encrypt the password

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

    //* save the data in database

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      gender,
      age,
      about,
      skills,
    });

    await user.save();

    // const user = new User({
    //   firstName: "Jane",
    //   lastName: "Doeh",
    //   email: "jane@gmail.com",
    //   password: 1234567,
    //   age: 76,
    //   gender: "female",
    // });

    // const user = new User(req.body);

    // console.log(req.body);

    // const user2 = new User2({
    //   firstName: "Sam",
    //   lastName: "Burgman",
    //   age: 99,
    //   emailId: "sam@gmail.com",
    //   address: "London",
    //   gender: "Male",
    // });

    // await user.save();
    // await user2.save();

    // console.log(user);
    res.send("User added successfully");
  } catch (err) {
    res.send("Error in saving user" + " " + err.message);
  }
});

router.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    //* Compare the password

    const isPasswordMatch = await user.validatePassword(password);

    if (!isPasswordMatch) {
      throw new Error("Invalid Credentials");
    }

    const token = await user.getJWTToken();

    console.log(token);

    res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });

    res.send("User logged in successfully");
  } catch (err) {
    res.send("Error in login" + " " + err.message);
  }
});

router.post("/logout", async (req, res) => {
  try {
    // res.cookie("token", null , {
    //   expires: new Date(Date.now()),
    // });
    res.clearCookie("token");
    res.send("User logged out successfully");
  } catch (err) {
    res.status(401).send("Error in logout" + " " + err.message);
  }
});

// router.use("/admin", adminAuth);

module.exports = router;
