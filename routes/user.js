const router = require("express").Router();
const requireLogin = require("../middlewares/requireLogin");
const Fundraiser = require("../models/fundraiser");
const User = require("../models/user");

router.get("/user/:id", requireLogin, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Fundraiser.find({ postedBy: req.params.id })
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name");

    res.json({ user, posts });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
