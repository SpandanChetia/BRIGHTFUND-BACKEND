const Fundraiser = require("../models/fundraiser");
const requireLogin = require("../middlewares/requireLogin");
const router = require("express").Router();

// Create Fundraiser
router.post("/", requireLogin, async (req, res) => {
  try {
    const fundraiser = await new Fundraiser({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category || "No category",
      goal: req.body.goal,
      upiId: req.body.upiId,
      postedBy: req.user._id,
    }).save();

    return res.status(201).json(fundraiser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Get Fundraiser by id
router.get("/id/:id", async (req, res) => {
  try {
    const fundraiser = await Fundraiser.findById(req.params.id)
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name");

    if (!fundraiser) {
      return res.status(404).json({ error: "Fundraiser not found" });
    }

    return res.json(fundraiser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Get Fundraisers by category
router.get("/category/:category", async (req, res) => {
  try {
    const fundraisers = await Fundraiser.find({ category: req.params.category })
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name");
    res.json(fundraisers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
