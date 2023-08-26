const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.ObjectId;

const DataSchema = new Schema({

    product_id: {
        type: ObjectId,
        required: true,
        ref: 'products'
    },
    title: {
        type: String,
        required: true,
    },
    short_des: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },

}, { timestamps: true, versionKey: false });

const ProductSliderModel = model('productSliders', DataSchema);

module.exports = ProductSliderModel;