// const { ValidationError } = require("custom-error-handlers/error");
const SendEmail = require("../config/SendEmail");
const UserModel = require("../models/UserModel");
const { CreateToken } = require('../config/Token');
const UserProfileModel = require("../models/UserProfileModel");
const bcrypt = require('bcrypt');


//!Login With OTP

//!Send User Otp Service
exports.UserOtpSend = async (req, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            // throw new ValidationError('Email is required')
            return { status: "fail", error: "Email is required" }
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        const emailData = {
            to: email,
            subject: 'Verification For Login!',
            html: `Your OTP is: ${otp}`
        }

        await SendEmail(emailData);

        await UserModel.updateOne({ email }, { $set: { otp } }, { upsert: true });

        return { status: "success", message: "Otp Sent Successfully" }

    } catch (error) {
        console.log(error)
        return { status: "fail", error: 'Something Went Wrong' }
    }
};

//!Verify User Otp Service
exports.UserOtpVerify = async (req) => {
    try {
        let { email, otp } = req.body;

        if (!otp) {
            // throw new ValidationError('OTP is required')
            return { status: "fail", error: "OTP is required" }
        }

        const verify = await UserModel.findOne({ email, otp }).count('total')

        if (verify === 1) {
            const check = await UserModel.findOne({ email })

            const checkExpire = new Date().getTime() - check.updatedAt;
            const expireTime = Math.floor(checkExpire / 1000);

            if (expireTime > 300) {
                return { status: 'fail', error: 'OTP is Expired. Please try again!' };

            }

            const user_id = await UserModel.findOne({ email, otp }).select('_id');

            const token = await CreateToken(
                email, user_id['_id'],
                '24h'
            );

            await UserModel.updateOne({ email: email }, { $set: { otp: '0' } }, { upsert: true })

            return {
                status: 'Success',
                massage: 'Login Seccess',
                token
            };
        } else {
            return {
                status: 'fail',
                error: 'Oops! The OTP you provided is incorrect. Please check your Email and provide the correct OTP.'
            };
        }

    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }

    }
};




//!Login With Password

//!User Login Service With Password
exports.LoginWithPassword = async (req) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return { status: "fail", error: "Email is required" }
        }
        if (!password) {
            return { status: "fail", error: "Password is required" }
        }
        if (password.length < 6) {
            return {
                status: "fail",
                error: "Password must be at least 6 characters long"
            }
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return {
                status: "fail",
                error: "User Not Found"
            }
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return {
                status: "fail",
                error: "Email or Password incorrect"
            }
        }

        const token = await CreateToken(
            email, user._id,
            '24h'
        );
        return {
            status: "success",
            massage: "Login Seccess",
            token
        };


    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};


//!User Logout
exports.UserLogout = () => {
    try {
        return {
            status: "success",
            massage: "Logout Seccess"
        };
    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};


//!User Profile Update Service
exports.UserProfileUpdate = async (req) => {
    try {
        const reqBody = req.body;
        const user_id = req.headers.id;

        reqBody.user_id = user_id

        await UserProfileModel.updateOne({ user_id }, { $set: reqBody }, { upsert: true });

        return { status: "success", message: "Profile Save Changed!" }

    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};

//!Update User Password
exports.UpdatePassword = async (req) => {
    try {
        const { password, confirmPassword } = req.body;
        const user_email = req.headers.email;

        if (!password) {
            // throw new ValidationError('Password is required')
            return { status: "fail", error: "Password is required" }
        }
        if (password.length < 6) {
            // throw new ValidationError('Password must be at least 6 characters long')
            return { status: "fail", error: "Password must be at least 6 characters long" }
        }
        if (!confirmPassword) {
            // throw new ValidationError('Confirm Password is required')
            return { status: "fail", error: "Confirm Password is required" }
        }
        if (!password === confirmPassword) {
            // throw new ValidationError('Password and Confirm Password must be same')
            return { status: "fail", error: "Password and Confirm Password must be same" }
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        await UserModel.updateOne({ email: user_email }, { $set: { password: hashedPassword } }, { upsert: true });

        return { status: "success", message: "Password Save Changed!" }

    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};

//!User Profile Read Service
exports.UserProfileRead = async (req) => {
    try {
        const user_id = req.headers.id;

        const profile = await UserProfileModel.find({ user_id });

        if (!profile) {
            return { status: 'fail', error: 'Profile Not Found' }
        }

        return { status: "success", data: profile }
    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
}






