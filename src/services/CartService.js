const CartModel = require("../models/CartModel");
const ProductModel = require("../models/ProductModel");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

//!Add Product In Cart
exports.AddProductCart = async (req) => {
    try {
        const user_id = req.headers.id;

        const { product_id, qty } = req.body;



        const product = await ProductModel.findOne({ _id: product_id });

        let price = product.price;

        if (product.discount) {
            price = product.discount_price;
        }

        const total_price = price * qty;

        const cartProduct = await CartModel.updateOne(
            { user_id, product_id },
            { $set: { product_id, qty, total_price } },
            { upsert: true }
        );

        return {
            status: 'Success',
            massage: 'Product has been added',
            data: cartProduct
        };

    } catch (error) {
        console.log(error);
        return { status: 'fail', error: 'Something went wrong' }
    }
};

//!Delete a product from Cart
exports.DeleteProductCart = async (req) => {
    try {
        const user_id = req.headers.id;

        const { product_id } = req.body;

        await CartModel.findOneAndDelete({ user_id, product_id });

        return { status: 'Success', massage: 'Product has been deleted' }

    } catch (error) {
        console.log(error);
        return { status: 'fail', error: 'Something went wrong' }
    }
};

//!Cart List
exports.CartList = async (req) => {
    try {
        const user_id = new ObjectId(req.headers.id);

        const matchUser = { $match: { user_id } }


        const carts = await CartModel.aggregate([
            matchUser
        ])

        return { status: 'Success', data: carts }

    } catch (error) {
        console.log(error);
        return { status: 'fail', error: 'Something went wrong' }
    }
};

