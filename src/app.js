const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

const authRouter = require("./routes/auth");

const connectDb = require("./config/database");

const User = require("./model/user");

console.log(connectDb);
// app.use("/", authRouter);

app.post("/signup",  async (req, res) => {
  const user = new User({
    firstName: "Jane",
    lastName: "Doeh",
    email: "jane@gmail.com",
    password: 1234567,
    age: 76,
    gender: "female",
  });

  await user.save();

  // console.log(user);
  res.send("User added successfully");
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
