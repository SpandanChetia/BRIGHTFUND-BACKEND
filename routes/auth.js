const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const requireLogin = require("../middlewares/requireLogin");

const JWT_SECRET = "spandan";
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please Add all the fields !!" });
  }

  try {
    const savedUser = await User.findOne({ email: email });
    if (savedUser) {
      return res.status(422).json({ error: "User already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      pic,
    });

    await user.save();
    res.json({ message: "User Saved Successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Please Enter both Email and Password" });
  }

  const savedUser = await User.findOne({ email });
  if (!savedUser) {
    return res
      .status(422)
      .json({ error: "User Doesn't Exist with this email ID" });
  }

  const didMatch = await bcrypt.compare(password, savedUser.password);
  if (!didMatch) {
    return res.status(422).json({ error: "Invalid Password" });
  }

  const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);

  return res.json({
    token,
    user: {
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      followers: savedUser.followers,
      following: savedUser.following,
      pic: savedUser.pic,
    },
  });
});

router.get("/", requireLogin, async (req, res) => {
  return res.json({ user: req.user });
});

module.exports = router;
