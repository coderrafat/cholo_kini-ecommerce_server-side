const { UserOtpSend, UserOtpVerify, UpdatePassword, LoginWithPassword, UserLogout } = require("../services/UserService");

//!Login With OTP

//!Sent Email For Login
exports.Login = async (req, res, next) => {
    const result = await UserOtpSend(req, next)

    res.status(200).json(result)
};

//!Check Otp For Login
exports.LoginVerify = async (req, res) => {
    const result = await UserOtpVerify(req)

    res.status(200).json(result)
};

//!Login With Password
exports.LoginWithPassword = async (req, res) => {
    const result = await LoginWithPassword(req)

    res.status(200).json(result)
};

//!User Logout
exports.UserLogout = async (req, res) => {
    const result = await UserLogout(req)
    res.status(200).json(result)
};

//!Update User Password
exports.UpdatePassword = async (req, res) => {
    const result = await UpdatePassword(req)

    res.status(200).json(result)
};
