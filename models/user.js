const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fundraiserSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    donationMinLimit: {
        type: Number,
        required: true
    }
});

const userSchema = new Schema({
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
