const { v4 } = require('uuid');

const {validationResult} = require('express-validator');
const HttpError = require("../model/http-error");

const UserModel = require("../model/user-model");

exports.userMain = (req,res,next)=>{
    res.json(USERS)
}

exports.userLogin = (req,res,next)=>{
    const {email,password} = req.body;
    res.json({"Login":"Yes"})
}

exports.userSignup = (req,res,next)=>{
    const valErr = validationResult(req);
    if(!valErr.isEmpty()){
        throw new HttpError("Invalid input in signup",302);
    }
    
    const {name,email,password,imageUrl} = req.body;
    const newUser = new UserModel({name,email,password,imageUrl});

    newUser.save().then(result=>{
        res.json(result);
    })
    .catch(err=>{
        console.log("Unable to create new user!");
        next(new HttpError("Unable to create new user",302))
    })
}