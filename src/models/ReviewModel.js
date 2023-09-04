const { Schema, model } = require('mongoose');

const { ObjectId } = Schema;

const DataSchema = new Schema({

    customer_id: {
        type: ObjectId,
        required: true,
        ref: 'users'
    },
    product_id: {
        type: ObjectId,
        required: true,
        ref: 'products'
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    }

}, { timestamps: true, versionKey: false });

const ReviewModel = model('reviews', DataSchema);

module.exports = ReviewModel;