const { AddProductCart, CartList, DeleteProductCart } = require("../services/CartService")

exports.AddProductCart = async (req, res) => {
    const result = await AddProductCart(req);

    res.status(200).json(result);
};

exports.DeleteProductCart = async (req, res) => {
    const result = await DeleteProductCart(req);

    res.status(200).json(result);
};


exports.CartList = async (req, res) => {
    const result = await CartList(req);

    res.status(200).json(result);
};
