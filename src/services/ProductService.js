const slugify = require("slugify");
const ProductModel = require("../models/ProductModel");


//!Create a new Product
exports.CreateProduct = async (req) => {
    try {
        const { category_id, brand_id, title, short_des, description, price, image, star, } = req.body;

        if (!category_id) {
            return { status: 'fail', error: 'Category ID is required' }
        }
        if (!brand_id) {
            return { status: 'fail', error: 'Brand ID is required' }
        }
        if (!title) {
            return { status: 'fail', error: 'Title is required' }
        }
        if (!short_des) {
            return { status: 'fail', error: 'Short Description is required' }
        }
        if (!description) {
            return { status: 'fail', error: 'Description is required' }
        }
        if (!price) {
            return { status: 'fail', error: 'Price is required' }
        }
        if (!image) {
            return { status: 'fail', error: 'Image is required' }
        }
        if (!star) {
            return { status: 'fail', error: 'Star is required' }
        }

        const existingTitle = await ProductModel.findOne({ title });

        if (existingTitle) {
            return { status: 'fail', error: 'Title already exists' }
        }

        const product = await ProductModel.create({ category_id, brand_id, title, slug: slugify(title), short_des, description, price, image, star });

        return { status: 'Success', massage: 'Product has been Created!', data: product };


    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};

//!Update a Product By Slug
exports.UpdateProduct = async (req) => {
    try {
        const { category_id, brand_id, title, short_des, description, price, image, star, } = req.body;
        const { slug } = req.params;

        const product = await ProductModel.findOne({ slug: slug });

        if (!product) {
            return { status: 'fail', error: 'Product not Found' }
        }

        const updateProduct = await ProductModel.findOneAndUpdate({ slug: slug }, {
            category_id: category_id || product.category_id,
            brand_id: brand_id || product.brand_id,
            title: title || product.title,
            slug: slugify(title) || product.slug,
            short_des: short_des || product.short_des,
            description: description || product.description,
            price: price || product.price,
            image: image || product.image,
            star: star || product.star

        }, { new: true });

        return { status: 'Success', massage: 'Product has been Updated!', data: updateProduct }

    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};

//!Dalete a Product By Slug
exports.DeleteProduct = async (req) => {
    try {
        const { slug } = req.params;

        const product = await ProductModel.findOne({ slug: slug })

        if (!product) {
            return { status: 'fail', error: 'Product Not Found' }
        }

        const deleteProduct = await ProductModel.findOneAndDelete({ slug: slug })

        return {
            status: 'Success',
            massage: 'Product has been Deleted',
            data: deleteProduct
        };

    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};

//!Product List
exports.AllProducts = async () => {
    try {
        const products = await ProductModel.find();

        return { status: 'Success', data: products }
    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};

//!Product By Remark
exports.ProductByRemark = async (req) => {
    try {
        const { remark } = req.params;

        const joinStage1 = {
            $lookup: {
                from: 'categories',
                localField: 'category_id',
                foreignField: '_id',
                as: 'category'
            }
        };

        const joinStage2 = {
            $lookup: {
                from: 'brands',
                localField: 'brand_id',
                foreignField: '_id',
                as: 'brand'
            }
        };

        // const matchStage = { $match: { remark: remark } };

        const projectionStage = {
            $project: {
                'category_id': 0,
                'brand_id': 0,
                'category._id': 0,
                'brand._id': 0,
                '_id': 0,
            }
        }

        const data = await ProductModel.aggregate([
            joinStage1, joinStage2, projectionStage
        ]
        );

        return { status: 'Success', data: data }

    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};