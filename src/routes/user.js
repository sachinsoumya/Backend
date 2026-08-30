const User = require("../model/user");

const express = require("express");

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    console.log(users);

    res.send(users);
  } catch (err) {
    res.send("Error in getting user" + " " + err.message);
  }
});

router.get("/user", async (req, res) => {
  try {
    const email = req.body.emailId;

    const user = await User.findOne({ emailId: email });

    console.log(user);

    if (!user) {
      res.status(400).send("User not found");
    }

    res.send(user);
  } catch (err) {
    res.status(400).send("Error in getting user" + " " + err.message);
  }
});

module.exports = router;
