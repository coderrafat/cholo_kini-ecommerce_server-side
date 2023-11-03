const { Schema, model } = require('mongoose');

const DataSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    otp: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: 'user'
    }

}, { timestamps: true, versionKey: false });

const UserModel = model('users', DataSchema);

module.exports = UserModel;