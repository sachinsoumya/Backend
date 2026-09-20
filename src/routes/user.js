const express = require("express");

const router = express.Router();

const { userAuth } = require("../middlewares/auth");

const ConnectionRequests = require("../model/connectionRequest");

router.get("/user/requests", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await  ConnectionRequests.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId" , ["firstName" , "lastName" , "age" , "gender"]);

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

module.exports = router;
