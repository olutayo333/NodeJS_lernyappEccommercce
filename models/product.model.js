const mongoose = require("mongoose") 
const bcryptjs = require("bcryptjs"); const bcrypt = require("bcryptjs/dist/bcrypt");

let productSchema= mongoose.Schema({
    productName:{type: String, required:true },
    productPrice:{type: String, required:true,  },
    email:{type: String, required:true, },
    productCategory:{type:String, required:true, },
    productQuantity:{type:String, required:true },
    productDescription:{type:String, required:true },
    productImage:{type:String, required:true },
    
    uploadedDate:{type:Date, default:Date.now()},
}) 
//name:this.name, phonenumber:this.phonenumber,email:this.email, price:'1000', dataamount:'1.2GB'

let productModel = mongoose.model("productTable", productSchema)
module.exports = productModel
