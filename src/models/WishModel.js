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
    }

}, { timestamps: true, versionKey: false });

const WishModel = model('wisehes', DataSchema);

module.exports = WishModel;