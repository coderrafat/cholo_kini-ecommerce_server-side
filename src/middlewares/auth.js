const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

//!Is User Login
exports.isLogin = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({
                status: "Unauthorized",
                message: 'You are not loggedin',
            })
        }

        const decoded = await jwt.verify(token, process.env.JWT_KEY);

        req.headers.email = decoded['email'];
        req.headers.id = decoded['id'];

        next()

    } catch (error) {
        return res.status(401).json({
            status: "Unauthorized",
            message: 'You are not loggedin',
        })
    }
};

//!Is Admin Login
exports.isAdmin = async (req, res, next) => {
    try {
        const user_id = req.headers.id;

        const user = await UserModel.findById(user_id);

        if (user.role !== 'admin') {
            return res.status(401).json({
                status: "Unauthorized",
                message: 'You are not Admin',
            })
        }

        next()

    } catch (error) {
        return res.status(401).json({
            status: "Unauthorized",
            message: 'You are not Admin',
        })
    }
};