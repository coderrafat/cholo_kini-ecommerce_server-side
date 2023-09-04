const { Schema, model } = require('mongoose');

const { ObjectId } = Schema;

const DataSchema = new Schema({

    invoice_id: {
        type: ObjectId,
        required: true,
        ref: 'invoices'
    },
    product_id: {
        type: ObjectId,
        required: true,
        ref: 'products'
    },
    qty: {
        type: String,
        required: true,
    },
    sale_price: {
        type: String,
        required: true,
    }

}, { timestamps: true, versionKey: false });

const InvoiceProductModel = model('invoiceProducts', DataSchema);

module.exports = InvoiceProductModel;