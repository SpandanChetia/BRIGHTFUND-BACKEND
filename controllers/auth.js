import User from '../models/user';
import bcrypt from 'bcryptjs';

exports.getSignup = (req, res, next) =>{
    res.render('signup', {
        path: '/signup',
        pageTitle: 'Create Account',
        isAuthenticated: false
    })
}

exports.postSignup = (req, res, next) =>{
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmPassword;
    User.findOne({email: email})
    .then(userDoc=>{
        if(userDoc) {
            return res.redirect('/signup');
        }
        return bcrypt
        .hash(password, 12)
        .then(hashedPassword=>{
            const user = new User({
                fullName: fullName,
                email: email,
                password: hashedPassword,
                fundraisers: []
            });
            return user.save();
        })
        .then(result =>{
            res.redirect('/signin');
        })
    })
    .catch(err=>{
        console.log(err);
    });
};