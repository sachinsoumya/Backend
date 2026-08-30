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

router.delete("/user", async (req, res) => {
  try {
    const id = req.body.userId;
    console.log(id);

    const user = await User.findById(id);

    if (!user) {
      res.status(404).send("User not found");
    }

    const deletedUser = await User.findByIdAndDelete({ _id: id });

    // const deletedUser = await User.findByIdAndDelete(id);

    console.log(deletedUser);

    res.send("user deleted successfully");
  } catch (err) {
    res.status(404).send("Error while deleting the user" + " " + err.message);
  }
});

router.patch("/user", async (req, res) => {
  try {
    const userId = req.body._id;

    const data = req.body;

    const updatedDocument = await User.findByIdAndUpdate(userId, data, {
      new: true,
    });

    console.log(updatedDocument);

    res.send("user updated successfully");
  } catch (err) {
    res.status(404).send("Error while updating the user" + " " + err.message);
  }
});

module.exports = router;
