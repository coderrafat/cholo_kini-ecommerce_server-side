const jwt = require('jsonwebtoken')


//!Create Token
exports.CreateToken = async (data, expires) => {
    return await jwt.sign(data, process.env.JWT_KEY, { expiresIn: expires })
}