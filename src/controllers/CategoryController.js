const { CreateCategory, UpdateCategory, DeleteCategory, SingleCategory, CategoryList } = require("../services/CategoryService");




//!Create a new Category
exports.CreateCategory = async (req, res) => {
    const result = await CreateCategory(req)

    return res.status(200).json(result);
};

//!Update a Category
exports.UpdateCategory = async (req, res) => {
    const result = await UpdateCategory(req)

    return res.status(200).json(result);
};

//!Delete a Category
exports.DeleteCategory = async (req, res) => {
    const result = await DeleteCategory(req)

    return res.status(200).json(result);
};

//!Single Category
exports.SingleCategory = async (req, res) => {
    const result = await SingleCategory(req)

    return res.status(200).json(result);

};

//!Category List
exports.CategoryList = async (req, res) => {
    const result = await CategoryList()

    return res.status(200).json(result);

};