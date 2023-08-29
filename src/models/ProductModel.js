const { Schema, model } = require('mongoose');

const { ObjectId } = Schema;

const DataSchema = new Schema({

    category_id: {
        type: ObjectId,
        required: true,
        ref: 'categories'
    },
    brand_id: {
        type: ObjectId,
        required: true,
        ref: 'brands'
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    short_des: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        max: 2000
    },
    price: {
        type: String,
        required: true,
    },
    discount: {
        type: Boolean,
        default: false
    },
    discount_price: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Boolean,
        default: true
    },
    star: {
        type: String,
        trim: true,
        required: true
    },
    remark: {
        type: String,
        enum: ['new', 'top', 'trending', 'popular', 'special', 'regular']
    }

}, { timestamps: true, versionKey: false });

const ProductModel = model('products', DataSchema);

module.exports = ProductModel;