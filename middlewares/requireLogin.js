const User = require("../models/user");
const jwt = require("jsonwebtoken");

const requireLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ error: "You must be logged in" });

  const token = authorization.replace("Bearer ", "");
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(_id);
    next();
  } catch (err) {
    return res.status(401).json({ error: "You must be logged in" });
  }
};

module.exports = requireLogin;
