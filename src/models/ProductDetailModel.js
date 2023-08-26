const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.ObjectId;

const DataSchema = new Schema({

    img1: {
        type: String,
        required: true
    },
    img2: {
        type: String,
        required: true
    },
    img3: {
        type: String,
        required: true
    },
    img4: {
        type: String,
        required: true
    },
    des: {
        type: String,
        required: true,
        trim: true,
    },
    color: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    product_id: {
        type: ObjectId,
        ref: 'products'
    },


}, { timestamps: true, versionKey: false });

const ProductDetailModel = model('productDetails', DataSchema);

module.exports = ProductDetailModel;