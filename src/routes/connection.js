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

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  const toUserId = req.params.toUserId;

  try {
    const fromUserId = req.user._id;

    const toUserId = req.params.toUserId;

    const status = req.params.status;

    const connectionRequest = new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status,
    });
    const data = await connectionRequest.save();

    res.json({
      message: "Connection sent successfully",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in sending connection request",
      error: err.message,
    });
  }
});

module.exports = router;
