const express = require('express');
const router = express.Router();
const {loginDefault,postLogin,postLogout} = require('../controllers/login');
const {check,body} = require('express-validator/check');
const Users = require('../models/user')
router.use('/postlogin',
    [
        check('email')
        .isEmail()
        .withMessage("Not an valid Email Address")
        .custom((value,{req})=>{
            return Users.findOne({email:value})
            .then(result=>{
                if(!result){
                    return Promise.reject("User doesn't exist")
                } 
                return Promise.resolve();
            })
        }),
        check("password")
        .isLength({min:5})
        .withMessage("Password should be of min length 5")
    ],
postLogin)
router.use('/logout',postLogout)
router.use('/',loginDefault);



module.exports = router;