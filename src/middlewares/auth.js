const adminAuth = (req, res, next) => {
  const token = "xyzqwcj2be2ibcf12in3co1i";

  const authenticatedUser = token === "xyz";
  if (!authenticatedUser) {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

const userAuth = (req,res,next) => {
  const token = "xyzqwcj2be2ibcf12in3co1i";
  const authenticatedUser = token === "xyz";

  if (!authenticatedUser) {
    res.status(401).send("invalid token");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth
};
