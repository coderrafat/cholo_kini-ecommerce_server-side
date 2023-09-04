const { Login, LoginVerify } = require('../controllers/UserController');

const router = require('express').Router();

//!USER

//!Send Otp For User Login
router.post('/login', Login);

//!Verify Otp For User Login
router.post('/verify-login', LoginVerify);



module.exports = router;