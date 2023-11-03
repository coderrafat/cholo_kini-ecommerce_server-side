const { BrandList, CreateBrand, UpdateBrand, DeleteBrand, SingleBrand } = require('../controllers/BrandController');
const { AddProductCart, CartList, DeleteProductCart } = require('../controllers/CartController');
const { CategoryList, CreateCategory, UpdateCategory, DeleteCategory, SingleCategory } = require('../controllers/CategoryController');
const { CreateProduct, UpdateProduct, DeleteProduct, AllProducts, ProductByRemark } = require('../controllers/ProductController');
const { Login, LoginVerify, LoginWithPassword, UpdatePassword, UserLogout } = require('../controllers/UserController');
const { UserProfileUpdate, UserProfileRead } = require('../controllers/UserProfileController');
const { CreateWish, DeleteProductWish, UserWishList } = require('../controllers/WishController');
const { isLogin, isAdmin } = require('../middlewares/auth');
const PaymentSettingModel = require('../models/PaymentSettingModel');


const router = require('express').Router();

//!USER

//!Send Otp For User Login
router.post('/login-with-otp', Login);

//!Verify Otp For User Login
router.post('/verify-login', LoginVerify);

//!User Login With Password
router.post('/login-with-password', LoginWithPassword);

//!User Logout Route
router.get('/logout', isLogin, UserLogout);

//!User Password Update
router.post('/password-update', isLogin, UpdatePassword);


//!User Profile Update Route
router.post('/profile-update', isLogin, UserProfileUpdate);

//!User Profile Read Route
router.get('/profile', isLogin, UserProfileRead);




//!BRAND

//!Create a new Brand Route
router.post('/create-brand', isLogin, isAdmin, CreateBrand);

//!Update a Brand Route
router.post('/update-brand/:slug', isLogin, isAdmin, UpdateBrand);

//!Delete a Brand Route
router.delete('/delete-brand/:slug', isLogin, isAdmin, DeleteBrand);

//!Single Brand Route
router.get('/single-brand/:slug', SingleBrand);

//!Brand List Route
router.get('/brands', BrandList);




//!CATEGORY


//!Create a new Category Route
router.post('/create-category', isLogin, isAdmin, CreateCategory);

//!Update a Category Route
router.post('/update-category/:slug', isLogin, isAdmin, UpdateCategory);

//!Delete a Category Route
router.delete('/delete-category/:slug', isLogin, isAdmin, DeleteCategory);

//!Single Category Route
router.get('/single-category/:slug', SingleCategory)

//!Category List Route
router.get('/categories', CategoryList);





//!PRODUCTS

//!Create a new Product Route
router.post('/create-product', isLogin, isAdmin, CreateProduct);

//!Update a new Product Route
router.post('/update-product/:slug', isLogin, isAdmin, UpdateProduct);

//!Delete a new Product Route
router.delete('/delete-product/:slug', isLogin, isAdmin, DeleteProduct);

//!All Products Route
router.get('/products', AllProducts);

//!Products By Remark
router.get('/products/:remark', ProductByRemark)



//!WISH

//!Create Wish list Route
router.post('/add-wish', isLogin, CreateWish);

router.delete('/delete-product-wish', isLogin, DeleteProductWish);

router.get('/wishes', isLogin, UserWishList);



//!CART

router.post('/add-cart', isLogin, AddProductCart);

router.delete('/delete-cart', isLogin, DeleteProductCart);

router.get('/carts', isLogin, CartList);


router.get('/test', (req, res) => {
    PaymentSettingModel.create();
})


module.exports = router;