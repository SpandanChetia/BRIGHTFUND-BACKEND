import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export const getSignup = (req, res, next) => {
  res.render('signup', {
    path: '/signup',
    pageTitle: 'Create Account',
    isAuthenticated: false,
  });
};

export const postSignup = (req, res, next) => {
  const { fullName, email, password, confirmPassword } = req.body;

  User.findOne({ email })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            fullName,
            email,
            password: hashedPassword,
            fundraisers: [],
          });
          return user.save();
        })
        .then(() => {
          res.redirect('/signin');
        });
    })
    .catch(err => {
      console.log(err);
    });
};
