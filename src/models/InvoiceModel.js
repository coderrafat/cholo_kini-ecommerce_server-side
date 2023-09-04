const { Schema, model } = require('mongoose');

const { ObjectId } = Schema;

const DataSchema = new Schema({

    user_id: {
        type: ObjectId,
        required: true,
        ref: 'users'
    },
    total: {
        type: String,
        required: true,
    },
    payable: {
        type: String,
        required: true,
    },
    cus_details: {
        type: String,
        required: true
    },
    ship_details: {
        type: String,
        required: true
    },
    tran_id: {
        type: String,
        required: true
    },
    delivery_status: {
        type: String,
        required: true
    },
    payment_status: {
        type: String,
        required: true
    }

}, { timestamps: true, versionKey: false });

const InvoiceModel = model('invoices', DataSchema);

module.exports = InvoiceModel;