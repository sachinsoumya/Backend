const express = require("express");

const router = express.Router();

const { userAuth } = require("../middlewares/auth");

router.post("/sendConnectionRequest", userAuth, (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("User not found");
    }

    res.send("Connection request sent by" + " " + user.firstName);
  } catch (error) {
    res
      .status(401)
      .send("Error in sending connection request" + " " + error.message);
  }
});

module.exports = router;
