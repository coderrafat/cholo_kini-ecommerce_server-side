const WishModel = require("../models/WishModel");

const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

//!Add Product in wish list service
exports.CreateWish = async (req) => {
    try {
        const user_id = req.headers.id;

        const { product_id } = req.body;

        const wish = await WishModel.updateOne({ user_id, product_id }, { $set: { product_id } }, { upsert: true });

        return { status: 'Success', massage: 'Product has been added' };

    } catch (error) {
        console.log(error);
        return { status: 'fail', error: 'Something went wrong' }
    }
};

//!Delete Product from wish list service
exports.DeleteProductWish = async (req) => {
    try {
        const user_id = req.headers.id;

        const { product_id } = req.body;

        const product = await WishModel.findOneAndDelete({ user_id, product_id });

        if (!product) {
            return { status: 'fail', error: 'Product not found' }
        }

        return { status: 'Success', massage: 'Product has been deleted' }

    } catch (error) {
        console.log(error);
        return { status: 'fail', error: 'Something went wrong' }
    }
};

//!User Wish List
exports.UserWishList = async (req) => {
    try {
        const user_id = new ObjectId(req.headers.id);

        const matchUser = { $match: { user_id } };

        const JoinStageProduct = {
            $lookup: {
                from: "products",
                localField: "product_id",
                foreignField: "_id",
                as: "product"
            }
        };

        const unwindProductStage = { $unwind: "$product" }

        const JoinStageBrand = {
            $lookup: {
                from: "brands",
                localField: "product.brand_id",
                foreignField: "_id",
                as: "brand"
            }
        };

        const unwindBrandStage = { $unwind: "$brand" }

        const JoinStageCategory = {
            $lookup: {
                from: "categories",
                localField: "product.category_id",
                foreignField: "_id",
                as: "category"
            }
        };

        const unwindCategoryStage = { $unwind: "$category" }

        const projectStage = {
            $project: {
                '_id': 0,
                'user_id': 0,
                'product_id': 0,
                'createdAt': 0,
                'updatedAt': 0,
                'product._id': 0,
                'product.category_id': 0,
                'product.brand_id': 0,
                'brand._id': 0,
                'category._id': 0,

            }
        }

        const wishList = await WishModel.aggregate([
            matchUser,
            JoinStageProduct,
            unwindProductStage,
            JoinStageBrand,
            unwindBrandStage,
            JoinStageCategory,
            unwindCategoryStage,
            projectStage
        ])

        return { status: 'success', data: wishList }

    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something went wrong' }
    }
};