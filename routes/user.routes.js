const express = require("express");
const router = express.Router()

const {register, signin, getDashboard} = require('../controllers/user.controllers')
const{productUpload, editProduct, deleteProduct, allProducts} = require('../controllers/product.controller')

//USER ROUTES
router.post("/register", register)
router.post("/signin", signin)
router.get("/getdashboard", getDashboard )

//PRODUCT ROUTES
router.post("/productupload", productUpload )
router.post("/editproduct", editProduct)
router.post("/deleteproduct", deleteProduct)
router.get("/allproducts", allProducts)

module.exports =router