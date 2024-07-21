const User = require('../models/user');

exports.getSignup = (req, res, next) =>{
    res.render('signup', {
        path: '/signup',
        pageTitle: 'Create Account',
        isAuthenticated: false
    })
}

exports.postSignup = (req, res, next) =>{

};