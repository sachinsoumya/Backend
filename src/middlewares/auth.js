const jwt = require("jsonwebtoken");

const User = require("../model/user");

// const adminAuth = (req, res, next) => {
//   try {
//     const token = "xyzqwcj2be2ibcf12in3co1i";

//     const authenticatedUser = token === "xyz";
//     if (!authenticatedUser) {
//       res.status(401).send("Unauthorized");
//     } else {
//       next();
//     }
//   } catch (err) {
//     res.send("Internal server error....");
//   }
// };

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Please login !!!!");
    }

    const decodedObj = await jwt.verify(token, "app@#369");

    const { id } = decodedObj;

    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(404).send("Error" + " " + err.message);
  }
};

module.exports = {
  userAuth,
};
