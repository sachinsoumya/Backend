const express = require("express");

const router = express.Router();

const { userAuth } = require("../middlewares/auth");

const ConnectionRequests = require("../model/connectionRequest");

const SELECTED_FIELDS = ["firstName", "lastName", "age", "gender"];

const User = require("../model/user");

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

router.get("/user/feed", userAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    limit = limit > 50 ? 50 : limit;

    const skip = (page - 1) * limit;

    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequests.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
    });

    const connections = connectionRequests.map((item) => {
      if (item.toUserId.toString() === loggedInUser._id.toString()) {
        return item.fromUserId.toString();
      }

      return item.toUserId.toString();
    });

    const feedData = await User.find({
      _id: {
        $nin: [...connections, loggedInUser._id.toString()],
      },
    })
      .select(" firstName lastName gender about age skills")
      .skip(skip)
      .limit(limit);

    console.log(feedData);

    if (feedData.length == 0) {
      return res.json({
        message: "No feed found ",
        data:null
      });
    }

    // console.log(connections);

    res.json({
      message: loggedInUser.firstName + " " + "feed",
      data: feedData,
    });
  } catch (err) {
    res.status(400).send("ERROR" + " " + err.message);
  }
});

module.exports = router;
