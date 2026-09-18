const express = require("express");

const router = express.Router();

const { userAuth } = require("../middlewares/auth");

const ConnectionRequest = require("../model/connectionRequest");

const User = require("../model/user");

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

    

    const allowedStatus = ["interested", "ignored"];

    const isValidStatus = allowedStatus.includes(status);

    if (!isValidStatus) {
      return res.status(400).json({
        message: "Invalid status type",
      });
    }

    const isValid_toUserId = await User.findById(toUserId);

    if (!isValid_toUserId) {
      return res.status(404).json({
        message: "Invalid toUserId, user does not exist",
      });
    }

    //* If  there is an existing connectionRequest between the two users, then we will not allow to send another connection request.

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        {
          fromUserId,
          toUserId,
        },
        {
          fromUserId: toUserId,
          toUserId: fromUserId,
        },
      ],
    });

    if (existingConnectionRequest) {
      return res.status(400).json({
        message: "Connection  request already exists between the two users",
      });
    }







    const connectionRequest = new ConnectionRequest({
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
