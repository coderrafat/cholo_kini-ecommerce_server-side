const { Schema, model } = require('mongoose');

const DataSchema = new Schema({

    brandName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    brandImg: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

}, { timestamps: true, versionKey: false });

const BrandModel = model('brands', DataSchema);

module.exports = BrandModel;