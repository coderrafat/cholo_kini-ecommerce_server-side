const jwt = require('jsonwebtoken')

//!Create Token
exports.CreateToken = async (email, user_id, expires) => {
    return jwt.sign({ email: email, id: user_id }, process.env.JWT_KEY, { expiresIn: expires })
}