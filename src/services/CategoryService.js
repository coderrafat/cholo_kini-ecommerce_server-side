const CategoryModel = require("../models/CategoryModel");
const slugify = require('slugify');


//!Create a new Category Service
exports.CreateCategory = async (req) => {
    try {
        const { categoryName, categoryImg } = req.body;

        if (!categoryName) {
            return { status: 'fail', error: 'Category Name is required' };
        }
        if (!categoryImg) {
            return { status: 'fail', error: 'Category Image is required' };
        }

        const extendedCategory = await CategoryModel.findOne({ categoryName });

        if (extendedCategory) {
            return { status: 'fail', error: 'Category Already Exist' };
        }

        const data = await CategoryModel.create({
            categoryName,
            categoryImg,
            slug: slugify(categoryName)
        });

        return { status: 'success', massage: 'Category has been Created', data: data }
    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};

//!Update a Category By Slug Service
exports.UpdateCategory = async (req) => {
    try {
        const { categoryName, categoryImg } = req.body;
        const { slug } = req.params;

        const category = await CategoryModel.findOne({ slug })

        if (!category) {
            return { status: 'fail', error: 'Category Not Found' }
        }

        const existingCategory = await CategoryModel.findOne({ categoryName })

        if (existingCategory) {
            return { status: 'fail', error: 'Category Already Exist' }
        }

        const data = await CategoryModel.findOneAndUpdate({ slug }, {
            categoryName: categoryName || category.categoryName,
            categoryImg: categoryImg || category.categoryImg,
            slug: slugify(categoryName) || category.slug
        }, { new: true });

        return { status: 'success', massage: 'Category has been Updated', data: data }
    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};

//!Delete a Category By Slug Service
exports.DeleteCategory = async (req) => {
    try {
        const data = await CategoryModel.findOneAndDelete(req.params.slug);

        if (!data) {
            return { status: 'fail', error: 'Category Not Found' }
        }

        return { status: 'success', massage: 'Category has been Deleted', data: data }
    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};

//!Single Brand By slug
exports.SingleCategory = async (req) => {
    try {
        const data = await CategoryModel.findOne({ slug: req.params.slug });

        if (!data) {
            return { status: 'fail', error: 'Category Not Found' }
        }

        return { status: 'success', data: data }
    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};


//!Category List Service
exports.CategoryList = async () => {
    try {
        const data = await CategoryModel.find();

        if (!data) {
            return { status: 'fail', error: 'Category Not Found' }
        }

        return { status: 'success', data: data }
    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};