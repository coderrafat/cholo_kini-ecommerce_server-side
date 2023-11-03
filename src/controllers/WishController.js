const { CreateWish, DeleteProductWish, UserWishList } = require("../services/WishService")

exports.CreateWish = async (req, res) => {
    const result = await CreateWish(req);

    res.status(200).json(result)
};

exports.DeleteProductWish = async (req, res) => {
    const result = await DeleteProductWish(req);

    res.status(200).json(result)
};

exports.UserWishList = async (req, res) => {
    const result = await UserWishList(req);

    res.status(200).json(result)
};