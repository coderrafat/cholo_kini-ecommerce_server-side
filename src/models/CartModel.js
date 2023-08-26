const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.ObjectId;

const DataSchema = new Schema({

    user_id: {
        type: ObjectId,
        required: true,
        ref: 'users'
    },
    product_id: {
        type: ObjectId,
        required: true,
        ref: 'products'
    },
    color: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    qty: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },

}, { timestamps: true, versionKey: false });

const CartModel = model('carts', DataSchema);

module.exports = CartModel;