const { UserProfileUpdate, UserProfileRead, UpdatePassword } = require("../services/UserService")

//!User Profile Update
exports.UserProfileUpdate = async (req, res) => {
    const result = await UserProfileUpdate(req);

    res.status(200).json(result);
};

//!User Profile Read
exports.UserProfileRead = async (req, res) => {
    const result = await UserProfileRead(req);

    res.status(200).json(result);
};