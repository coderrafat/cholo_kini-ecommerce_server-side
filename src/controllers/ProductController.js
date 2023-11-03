const { CreateProduct, UpdateProduct, DeleteProduct, AllProducts, ProductByRemark } = require("../services/ProductService")


exports.CreateProduct = async (req, res) => {
    const result = await CreateProduct(req);

    res.status(200).json(result)
};

exports.UpdateProduct = async (req, res) => {
    const result = await UpdateProduct(req);

    res.status(200).json(result)
};

exports.DeleteProduct = async (req, res) => {
    const result = await DeleteProduct(req);

    res.status(200).json(result)
};

exports.AllProducts = async (req, res) => {
    const result = await AllProducts(req);

    res.status(200).json(result)
};

exports.ProductByRemark = async (req, res) => {
    const result = await ProductByRemark(req);

    res.status(200).json(result)
};

