const express = require('express');

const crypto = require('crypto');
const path = require('path');
const User = require('../models/user');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcryptjs')


sgMail.setApiKey('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');

const router = express.Router();

router.get('/resetPassword/:resetToken',(req,res,next)=>{
    console.log(req.params);
    User.findOne({
        resetToken:req.params.resetToken
    })
    .then(result=>{
        console.log(result);
        const email = result.email;
        if(Date.now()<=JSON.parse(result.tokenExpiry)){
            res.render(path.join(require.main.filename,'..','views','newpassword'),{email})
        } else {
            console.log("Invalid Token")
            res.send(`Hello`);
        }
    })
    .catch(err=>{
        console.log("Unable to find user using reset token");
    })
});

router.post('/postNewPassword',(req,res,next)=>{
    console.log(req.body);
    const {email,password,confrimPassword} = req.body;
    bcrypt.hash(password,12)
        .then(encryptPass=>{
            return User.updateOne({email},{
                $set:{
                    password:encryptPass,
                }
            })
        })
        .then(result=>{
            console.log(result,"User password updated successfully");
            res.redirect('/login');
        })
        .catch(err=>{
            console.log("Unable to update user password")
        })
})

router.post('/postReset',(req,res,next)=>{
    
    const email = req.body.email;
    let token;
    crypto.randomBytes(48, function(err, buffer) {
        token = buffer.toString('hex');
        // console.log(token);
        User.findOne({email})
            .then(user=>{
                if(!user){
                    return res.render(path.join(require.main.filename,'..','views','reset'),{isExist:false})
                }
                user.resetToken = token;
                user.tokenExpiry = Date.now() + 3600000;
                user.save()
                .then(saved=>{
                    const msg = {
                        to:email,
                        from:"sachinyadav1469@gmail.com",
                        subject:"Password Reset",
                        text: 'Please Reset Your Account Password By Clicking On The Below Link',
                        html:`<h1>Click <a href="http://localhost:8081/reset/resetPassword/${token}" style={color:blue;}>Here!</a></h1>`,              
                    };
                    sgMail.send(msg)
                    .then(result=>{
                        console.log(result,"Reset Link Has Been Sent");
                        res.redirect('/login')
                    })
                    .catch(err=>{
                        console.log(err.response.body.errors);
                        console.log("Unable to send email on reset link")
                    })
                })

            })
            .catch(err=>{
                console.log("Unable to find user in password reset")
            })
    })
    // res.send("Hello")
})
router.use('/',(req,res,next)=>{
    res.render(path.join(require.main.filename,'..','views','reset'),{isExist:true})
})

module.exports = router;