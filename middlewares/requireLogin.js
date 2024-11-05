const User = require("../models/user");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "spandan";

const requireLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ error: "You must be logged in" });

  const token = authorization.replace("Bearer ", "");
  try {
    const payload = await jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(payload._id);
    next();
  } catch (err) {
    return res.status(401).json({ error: "jwt invalid" });
  }
};

module.exports = requireLogin;
