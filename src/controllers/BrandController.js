const { CreateBrand, UpdateBrand, DeleteBrand, BrandList, SingleBrand } = require("../services/BrandService");



//!Create a new Brand
exports.CreateBrand = async (req, res) => {
    const result = await CreateBrand(req)

    return res.status(200).json(result);
};

//!Update a Brand
exports.UpdateBrand = async (req, res) => {
    const result = await UpdateBrand(req)

    return res.status(200).json(result);
};

//!Delete a Brand
exports.DeleteBrand = async (req, res) => {
    const result = await DeleteBrand(req)

    return res.status(200).json(result);
};

//!Single Brand with Slug
exports.SingleBrand = async (req, res) => {
    const result = await SingleBrand(req)

    return res.status(200).json(result);
};

//!Brand List Controller
exports.BrandList = async (req, res) => {
    const result = await BrandList()

    return res.status(200).json(result);
}