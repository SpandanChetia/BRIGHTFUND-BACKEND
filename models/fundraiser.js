const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const fundraiserSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "No category",
    },
    goal: {
      type: Number,
      min: [0, "Goal amount cannot be less than 0"],
      default: 0,
      required: true,
    },
    QRCode: {
      type: String,
      required: true,
    },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [
      {
        text: String,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Fundraiser = mongoose.model("Fundraiser", fundraiserSchema);
module.exports = Fundraiser;
