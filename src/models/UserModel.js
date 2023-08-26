const { Schema, model } = require('mongoose');

const DataSchema = new Schema({

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    otp: {
        type: String,
        required: true,
    },

}, { timestamps: true, versionKey: false });

const UserModel = model('users', DataSchema);

module.exports = UserModel;