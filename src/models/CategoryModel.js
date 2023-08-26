const { Schema, model } = require('mongoose');

const DataSchema = new Schema({

    categoryName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    categoryImg: {
        type: String,
        required: true,
    }

}, { timestamps: true, versionKey: false });

const CategoryModel = model('categories', DataSchema);

module.exports = CategoryModel;