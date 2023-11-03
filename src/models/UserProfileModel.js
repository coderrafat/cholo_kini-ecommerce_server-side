const { Schema, model } = require('mongoose');

const { ObjectId } = Schema;

const DataSchema = new Schema({

    user_id: {
        type: ObjectId,
        required: true,
        ref: 'users'
    },
    cus_name: {
        type: String,
        required: true,
        trim: true,
    },
    cus_add: {
        type: String,
        required: true,
    },
    cus_city: {
        type: String,
        required: true,
    },
    cus_state: {
        type: String,
        required: true,
        default: 'Dhaka'
    },
    cus_postcode: {
        type: String,
        required: true,
        default: '23232'
    },
    cus_country: {
        type: String,
        required: true,
        default: 'Bangladesh'
    },
    cus_phone: {
        type: String,
        required: true,
    },
    cus_fax: {
        type: String,
        required: true,
        default: '1212'
    },
    ship_name: {
        type: String,
        required: true,
        trim: true,
    },
    ship_add: {
        type: String,
        required: true,
    },
    ship_city: {
        type: String,
        required: true,
    },
    ship_city: {
        type: String,
        required: true,
    },
    ship_state: {
        type: String,
        required: true,
        default: 'Dhaka'
    },
    ship_postcode: {
        type: String,
        required: true,
        default: '23232'
    },
    ship_country: {
        type: String,
        required: true,
        default: 'Bangladesh'
    },
    ship_phone: {
        type: String,
        required: true,
    }

}, { timestamps: true, versionKey: false });

const UserProfileModel = model('userProfiles', DataSchema);

module.exports = UserProfileModel;