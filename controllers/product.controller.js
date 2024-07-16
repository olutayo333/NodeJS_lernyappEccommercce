const bcryptjs = require("bcryptjs")
let jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs/dist/bcrypt");

const userModel = require("../models/user.model")
const productModel = require('../models/product.model')

//PRODUCT UPLOAD
const productUpload = (req,res)=>{
    let productData = { 
        productName:req.body.productName,  
        productPrice:req.body.productPrice,
        email:req.body.email,
        productCategory:req.body.productCategory,
        productQuantity:req.body.productQuantity,
        productDescription:req.body.productDescription,
        productImage:req.body.productImage, 
    }
    let form = new productModel(productData)
    let userEmail= req.body.email

    form.save()
        .then(()=>{
            res.send({status:true, message:"Product upload was successful"});
            console.log("product uploadedsuccesfully ");
        })
        .catch((err)=>{console.log('Product could not be saved' + err); res.send({status:false, message:"Product Upload not successful"})})                          
}

const deleteProduct = (req, res)=>{
     let id = req.body.id;
      console.log(id);
      console.log(req.body);
     productModel.findOneAndDelete({_id:id})
    .then((result)=>{console.log("Deleted successfully" + result); res.send({status:true, message:"Deleted successfully", result})})
    .catch((err)=>{console.log(err+ "couldnt delete"); res.send({status:false, message:"could not Delete", result})})
}
// const deletetask = (req, res)=>{
//     let taskID = req.body._id; console.log(req.body);
//     userModel.findOneAndDelete({_id:taskID})
//     .then((result)=>{console.log(result); res.send({status:true, message:"Deleted successfully", result})})
//     .catch((err)=>{console.log(err+ "couldnt delete"); res.send({status:false, message:"could not Delete", result})})
// }

let userEmail;
const editProduct = (req, res)=>{
    console.log(req.body);
     let id = req.body.productID;
    let productName = req.body.productName; let productPrice = req.body.productPrice; let productCategory= req.body.productCategory;
    let productQuantity = req.body.productQuantity; let productDescription= req.body.productDescription;  let productImage = req.body.productImage; 

    productModel.findOneAndUpdate({_id:id}, {productName, productPrice, productCategory, productQuantity, productDescription, productImage}, {new:true})
    .then((result)=>{
    console.log(result);
    res.send({status:true, message:"Edited Successfully"})
    })
    .catch((err)=>{res.send({status:false, message:" Edit failed" + " " + err}); console.log(err, "couldnt edit");})
}

//PRODUCT DETAILS
const allProducts = (req, res)=>{
    productModel.find()
    .then((result)=>{console.log("products loaded successfully"); 
    res.send({status:true, message:"products loaded successfully", result })})
    
    .catch((err)=>{console.log("could not load products", err); 
    res.send({status:false, message:"could not load products"})})
}



module.exports={ productUpload, deleteProduct, editProduct, allProducts}