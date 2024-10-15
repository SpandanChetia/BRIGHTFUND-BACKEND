require("dotenv").config();
const express = require("express");

const cors = require("cors");
const app = express();

const authRouter = require("./routes/auth");
const fundraiserRouter = require("./routes/fundraiser");
const userRouter = require("./routes/user");

const connectToDb = require("./util/db");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/", authRouter);
app.use("/", fundraiserRouter);
app.use("/", userRouter);

app.use(express.urlencoded({ extended: true }));

connectToDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.dir(err);
    process.exit(1);
  });
