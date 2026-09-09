const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

const authRouter = require("./routes/auth");

const connectDb = require("./config/database");

const User = require("./model/user");

const profileRouter = require("./routes/profile");

const connectionRouter = require("./routes/connection");

const { validateData } = require("./utils/validate");

const bcrypt = require("bcryptjs");

const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");

app.use(cookieParser());

// const User2 = require("./model/user2");

console.log(connectDb);

app.use(express.json());
app.use("/", authRouter);

app.use("/", profileRouter);

app.use("/", connectionRouter);

app.post("/sendConRequest", userAuth, async (req, res) => {
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

connectDb()
  .then(() => {
    console.log("database connected successfully");
    app.listen(5555, (req, res) => {
      console.log("Server is running on port 5555");
    });
  })
  .catch((err) => {
    console.log("Database connection failed");
  });

// console.log(app);

// console.log(express);
