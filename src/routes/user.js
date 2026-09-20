const express = require("express");

const router = express.Router();

const { userAuth } = require("../middlewares/auth");

const ConnectionRequests = require("../model/connectionRequest");

const SELECTED_FIELDS = ["firstName", "lastName", "age", "gender"];

router.get("/user/requests", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequests.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", SELECTED_FIELDS);

    if (connectionRequests.length === 0) {
      return res.status(404).send("No connection requests are found");
    }

    res.json({
      message: loggedInUser.firstName + " " + "connection requests",
      data: connectionRequests,
    });
  } catch (err) {
    res.send("ERROR :" + " " + err.message);
  }
});

router.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequests.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
      status: "accepted",
    })
      .populate("fromUserId", SELECTED_FIELDS)
      .populate("toUserId", SELECTED_FIELDS);

    const data = connections.map((item) => {
      if (item.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return item.toUserId;
      }

      return item.fromUserId;
    });

    res.json({
      message: loggedInUser.firstName + " " + "connections",
      data: data,
    });
  } catch (error) {
    res.status(400).send("Error" + " " + error.message);
  }
});

module.exports = router;
