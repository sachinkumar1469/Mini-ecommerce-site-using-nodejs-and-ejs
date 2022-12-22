const express = require('express')
const router = express.Router();
const {signUpController,postSignupController} = require('../controllers/signup');
const {check,body} = require('express-validator/check')
const User = require('../models/user')

router.post('/postSignup',
    [
        check("email")
        .isEmail()
        .withMessage("Please enter valid email address!")
        .custom((value,{req})=>{
            return User.findOne({email:value})
            .then(result=>{
                if(result){
                    return Promise.reject("User Already Exists")
                }
                return Promise.resolve();
            })
        })
        ,
        body("password","please enter valid password")
        .isLength({min:5})
        .isAlphanumeric()
        ,
        body("confirmPassword")
        .custom((value,{req})=>{
            if(value !== req.body.password){
                throw new Error("Password doesn't match");
            }
            return true;
        })
        
    ],
    postSignupController)
router.get('/',signUpController);


module.exports = router;