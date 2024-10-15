require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const connectToDb = () =>
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log(err);
    });

module.exports = connectToDb;
