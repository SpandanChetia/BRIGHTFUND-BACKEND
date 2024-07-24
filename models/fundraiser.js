import mongoose from 'mongoose';

const { Schema } = mongoose;

const fundraiserSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    donationMinLimit: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

export default fundraiserSchema;
