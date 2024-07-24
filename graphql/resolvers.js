const User = require('../models/user');
const validator = require('validator');

module.exports = {
    createUser: async function({ userInput }, req) {
        let errors=[];
        if(!validator.isEmail(userInput.email)){
            errors.push({message: 'E-mail is invalid'});
        }
        if(validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, {min: 8})){
            errors.push({message: 'Password too short!'});
        }
        if(errors.length > 0){
            const error = new Error('Invalid input.');
            error.data = errors;
            error.code = 422;
            throw error;
        } 
        const existingUser = await User.findOne({email: userInput.email});
        if(existingUser) {
            const error = new Error('User exists already');
            throw error;
        }
        const hashedPW = await bcrypt.hash(userInput.password, 12);
        const user = new User({
            email: userInput.email,
            fullName: userInput.fullName,
            password : hashedPW
        });
        const createdUser = await user.save();
        return {...createdUser.doc, _id: createdUser._id.toString()}
    },

    login: async function({email, password}){
        const user = await User.findOne({email: email});
        if(!user){
            const error = new Error('User not found.');
            error.code = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual) {
            const error = new Error('Password is incorrect.');
            error.code = 401;
            throw error;
        }
        const token = jwt.sign({
            userId: user._id.toString(),
            email: user.email
        }, 'somesupersecret', {expiresIn : '1h'}
        );
        return {token: token, userId: user._id.toString()};
    }
};   