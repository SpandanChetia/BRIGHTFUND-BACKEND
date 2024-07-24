import mongoose from 'mongoose';
import fundraiserSchema from './fundraiser.js'; 

const Schema = mongoose.Schema;

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
    resetToken: String,
    resetTokenExpiration: Date,
    fundraisers: [fundraiserSchema] 
});

export default mongoose.model('User', userSchema);
