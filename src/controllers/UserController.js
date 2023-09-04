const SendEmail = require("../config/SendEmail");
const UserModel = require("../models/UserModel");
const { CreateToken } = require("../services/UserService/Token");
// const SaveOtp = require("../services/UserService/UserOtpService");
const { UserOtpSend } = require("../services/UserService/UserOtpService");
const { ValidationError } = require('custom-error-handlers/error');


//!Sent Email For Login
exports.Login = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            throw new ValidationError('Email is required', 404)
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        const emailData = {
            to: email,
            subject: 'Verification For Login!',
            html: `Your OTP is ${otp}`
        }

        await SendEmail(emailData);

        await UserOtpSend(otp, email, UserModel)

        return res.status(200).json({ status: 'Success', massage: 'Email has been Sent!' });
    } catch (error) {
        next(error);
        return res.status(200).json({ status: 'fail', message: "Something went wrong" })
    }
};

//!Check Otp For Login
exports.LoginVerify = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        if (!otp) {
            throw new ValidationError('OTP is required', 404)
        }

        const verify = await UserOtpService(otp, email, UserModel);

        console.log(verify)

        if (verify === 1) {
            const token = CreateToken(email, '24h');
            await UserOtpService('0', email, UserModel);

            return res.status(200).json({
                status: 'Success',
                massage: 'Login Seccess',
                token
            });
        } else {
            return res.status(200).json({
                status: 'fail',
                error: 'Invalid OTP'
            });
        }

    } catch (error) {
        next(error);
    }
};

