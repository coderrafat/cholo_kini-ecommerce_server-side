const BrandModel = require("../models/BrandModel");
const slugify = require('slugify');


//!Create a new Brand
exports.CreateBrand = async (req) => {
    try {
        const { brandName, brandImg } = req.body;

        if (!brandName) {
            return { status: 'fail', error: 'Brand Name is Required' }
        }
        if (!brandImg) {
            return { status: 'fail', error: 'Brand Image is Required' }
        }

        const existingBrand = await BrandModel.findOne({ brandName });

        if (existingBrand) {
            return { status: 'fail', error: 'Brand Name Already Exists' }
        }

        const data = await BrandModel.create({
            brandName,
            brandImg,
            slug: slugify(brandName)
        });

        return { status: 'success', massage: 'New Brand has been Created!', data: data }
    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};

//!Update a Brand By Slug
exports.UpdateBrand = async (req) => {
    try {
        const { brandName, brandImg } = req.body
        const slug = req.params.slug

        const brand = await BrandModel.findOne({ slug });

        if (!brand) {
            return { status: 'fail', error: 'Brand Not Found' }
        }

        const existingBrand = await BrandModel.findOne({ brandName });

        if (existingBrand) {
            return { status: 'fail', error: 'Brand Name Already Exists' }
        }

        const data = await BrandModel.findOneAndUpdate({ slug }, {
            brandName: brandName || brand.brandName,
            brandImg: brandImg || brand.brandImg,
            slug: slugify(brandName) || brand.slug
        }, { new: true });


        return { status: 'success', massage: 'Brand has been Updated!', data: data }
    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};

//!Delete a Brand By Slug
exports.DeleteBrand = async (req) => {
    try {
        const data = await BrandModel.findOneAndDelete(req.params.slug);

        if (!data) {
            return { status: 'fail', error: 'Brand Not Found' }
        }

        return { status: 'success', massage: 'Brand has been Deleted!', data: data }
    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};

//!Single Brand By Slug slug
exports.SingleBrand = async (req) => {
    try {
        const data = await BrandModel.findOne({ slug: req.params.slug });

        if (!data) {
            return { status: 'fail', error: 'Brand Not Found' }
        }

        return { status: 'success', data: data }
    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};

//!Brand List Service
exports.BrandList = async () => {
    try {
        const data = await BrandModel.find();

        if (!data) {
            return { status: 'fail', error: 'Brand Not Found' }
        }

        return { status: 'success', data: data }
    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};