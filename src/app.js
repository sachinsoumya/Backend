const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

const authRouter = require("./routes/auth");

const connectDb = require("./config/database");

const User = require("./model/user");

const userRouter = require("./routes/user");

const { validateData } = require("./utils/validate");

const bcrypt = require("bcryptjs");

const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");

app.use(cookieParser());

// const User2 = require("./model/user2");

console.log(connectDb);

app.use(express.json());
// app.use("/", authRouter);

app.use("/", userRouter);

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    console.log(user);

    res.send(user);
  } catch (err) {
    res.status(401).send("Error in profile page" + " " + err.message);
  }
});

app.post("/signup", async (req, res) => {
  try {
    //* Validate the data

    validateData(req.body);

    const {
      firstName,
      lastName,
      emailId,
      password,
      gender,
      age,
      about,
      skills,
    } = req.body;

    //* encrypt the password

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    console.log(hashedPassword);

    //* save the data in database

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      gender,
      age,
      about,
      skills,
    });

    await user.save();

    // const user = new User({
    //   firstName: "Jane",
    //   lastName: "Doeh",
    //   email: "jane@gmail.com",
    //   password: 1234567,
    //   age: 76,
    //   gender: "female",
    // });

    // const user = new User(req.body);

    // console.log(req.body);

    // const user2 = new User2({
    //   firstName: "Sam",
    //   lastName: "Burgman",
    //   age: 99,
    //   emailId: "sam@gmail.com",
    //   address: "London",
    //   gender: "Male",
    // });

    // await user.save();
    // await user2.save();

    // console.log(user);
    res.send("User added successfully");
  } catch (err) {
    res.send("Error in saving user" + " " + err.message);
  }
});

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    //* Compare the password

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error("Invalid Credentials");
    }

    const token = await jwt.sign({ id: user._id }, "app@#369", {
      expiresIn: "1d",
    });

    console.log(token);

    res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });

    res.send("User logged in successfully");
  } catch (err) {
    res.send("Error in login" + " " + err.message);
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
