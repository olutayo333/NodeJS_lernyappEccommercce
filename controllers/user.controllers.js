const bcryptjs = require("bcryptjs")
let jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs/dist/bcrypt");

const userModel = require("../models/user.model")
const productModel = require("../models/product.model")

//USER REGISTRATION
const register = (req,res)=>{
    let userData = { 
        name:req.body.name,  
        phonenumber:req.body.phonenumber,
        email:req.body.email,
        password:req.body.password,
    }
    let form = new userModel(userData)
    let userEmail= req.body.email

    userModel.find({email:userEmail})
        .then ((result)=>{ console.log(result);
            if(result.length>0){ res.send({status:false, message:"Email Already Exist, Please proceed to Login"}); console.log('user already exist')}
            else{
                form.save()
                .then(()=>{console.log("data saved succesfully ");res.send({status:true, message:"signup was successful"})})
                .catch((err)=>{console.log('Data could not be saved' + err); res.send({status:false, message:"signup not successful"})})                
            }
        })
        .catch((err)=>{console.log(err)})
        console.log(req.body)          
}

//USER LOGIN
let signinemail;
const signin = (req, res)=>{
    //console.log(req.body);
    let {email,password} = req.body
    signinemail = req.body.email
    console.log(signinemail);
    userModel.findOne({email:email})
    .then((user)=>{
        //console.log(user);
        if(!user){
            res.send({status:false, message:"user not found"})
        }
        else{
            user.validatePassword(password, (err, same)=>{
                if (!same){
                    res.send({status:false, message:"Incorrect Password"})
                }
                else{
                    let secret = process.env.SECRET
                    let token = jwt.sign({email}, secret, {expiresIn:900}); 
                    res.send({user, token, message:" Login successful!", status:true, })
                }
                console.log("hurray user exist");
            })
        
        }
    })
    .catch((err)=>{console.log(err);})
}

//AUTORIZATION FOR THE DASHBOARD
const getDashboard = (req,res)=>{
    console.log("iz workign")
   let token = req.headers.authorization.split(" ")[1];
   let secret = process.env.SECRET
   jwt.verify(token, secret, (err,result)=>{
   if(err){console.log(err); res.send({status:false, message:"can't signin"})}
   else{
           userModel.findOne({email:signinemail})
           .then((user)=>{
               if(!user){
                   res.send({message:"user not found", status:"false"})
               }
               else{
                   res.send({status:true, message:"user found", user})
               }
           })
           .catch((err)=>{console.log("could not fetch data" + err); res.send({status:false})})
       }
   })
}


module.exports={register, signin, getDashboard}

