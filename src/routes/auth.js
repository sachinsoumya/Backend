const express = require("express");

const router = express.Router();

const { adminAuth, userAuth } = require("../middlewares/auth");

// router.use("/admin", adminAuth);

router.get("/getUserData", (req, res) => {
  try {
    throw new Error("something went wrong..");
    res.send("User data fetched successfully");
  } catch (err) {
    res.status(401).send("something went wrong........");
  }
});

router.get("/admin/user", (req, res) => {
  
  res.send("Welcome to the admin page");
});

router.delete("/admin/user", (req, res) => {
  res.send("User deleted successfully");
});

router.get("/user", userAuth, (req, res) => {
  res.json({
    message: "User fetched successfully",
    data: [
      {
        name: "John Doe",
        age: 45,
      },
      {
        name: "Jani Doe",
        age: 67,
      },
    ],
  });
});

router.use("/", (err, req, res, next) => {
  if (err) {
    console.log(err.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
