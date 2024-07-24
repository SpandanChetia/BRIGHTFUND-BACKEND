import User from "../models/user.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const getSignup = (req, res, next) => {
  res.render("signup", {
    path: "/signup",
    pageTitle: "Create Account",
    isAuthenticated: false,
  });
};

export const postSignup = (req, res, next) => {
  const { fullName, email, password, confirmPassword } = req.body;

  User.findOne({ email })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            fullName,
            email,
            password: hashedPassword,
            fundraisers: [],
          });
          return user.save();
        })
        .then(() => {
          res.redirect("/signin");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getReset = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: message,
  });
};

export const postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then(user=>{
        if(!user){
          req.flash('error', 'No account with this email found');
          return res.redirect('/reset');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result=>{

      })
      .catch((err) => {
        console.log(err);
      });
  });
};
