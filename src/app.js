const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

const authRouter = require("./routes/auth");

const connectDb = require("./config/database");

const User = require("./model/user");

const userRouter = require("./routes/user");


// const User2 = require("./model/user2");

console.log(connectDb);

app.use(express.json());
// app.use("/", authRouter);

app.use("/" , userRouter);

app.post("/signup", async (req, res) => {
  try {
    // const user = new User({
    //   firstName: "Jane",
    //   lastName: "Doeh",
    //   email: "jane@gmail.com",
    //   password: 1234567,
    //   age: 76,
    //   gender: "female",
    // });

    const user = new User(req.body);

    console.log(req.body);

    // const user2 = new User2({
    //   firstName: "Sam",
    //   lastName: "Burgman",
    //   age: 99,
    //   emailId: "sam@gmail.com",
    //   address: "London",
    //   gender: "Male",
    // });

    await user.save();
    // await user2.save();
    

    // console.log(user);
    res.send("User added successfully");
  } catch (err) {
    res.send("Error in saving user" + " " + err.message);
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
