const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fundraiserSchema = require('./fundraiser');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fundraisers: [fundraiserSchema] 
});

module.exports = mongoose.model('User', userSchema);
