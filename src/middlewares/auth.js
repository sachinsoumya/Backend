const adminAuth = (req, res, next) => {
  try {
    const token = "xyzqwcj2be2ibcf12in3co1i";

    const authenticatedUser = token === "xyz";
    if (!authenticatedUser) {
      res.status(401).send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    res.send("Internal server error....");
  }
};

const userAuth = (req, res, next) => {
  try {
    const token = "xyzqwcj2be2ibcf12in3co1i";
    const authenticatedUser = token === "xyz";

    if (!authenticatedUser) {
      res.status(401).send("invalid token");
    } else {
      next();
    }
  } catch (err) {
    res.send("Internal server error...");
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
