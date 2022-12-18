const path = require('path');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail')

const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport')
sgMail.setApiKey('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')

const transporter = nodemailer.createTransport(sendGridTransport({
    auth:{
        api_key: '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'
    }
}))

exports.signUpController = (req,res,next)=>{
    console.log(req.body);
    res.render(path.join(require.main.filename,"..","views","signup"),{user:null})
}

exports.postSignupController = (req,res,next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({email}).then(result=>{
        // console.log(result)
        if(result){
            // console.log("here")
            res.render(path.join(require.main.filename,"..","views","signup"),{user:result});
        } else {
            bcrypt.hash(password,12)
            .then(encryptPass=>{
                console.log(encryptPass)
                User.create({name,email,password:encryptPass,cart:{items:[]}})
                .then(result=>{
                    req.session.user = result;
                    req.session.save(()=>{
                        // transporter.sendMail({
                        //     to:email,
                        //     from:"sachinextra000@gmail.com",
                        //     subject:"SingUp Succesfull",
                        //     html:"<h1>Welcome to the node tutorial...</h1>"
                        // })
                        const msg = {
                            to:email,
                            from:"sachinextra000@gmail.com",
                            subject:"SingUp Succesfull",
                            text: 'and easy to do anywhere, even with Node.js',
                            html:"<h1>Welcome to the node tutorial...</h1>",              
                        };
                        sgMail.send(msg)
                        .then(result=>{
                            console.log(result,"resulttttttttttttttttttttttttttttt");
                            res.redirect('/')
                        })
                        .catch(err=>{
                            console.log(err);
                            console.log("Unable to send email on signup")
                        })
                    })
                })
                .catch(err=>{console.log("Unable to create new user in signup")})
            })
            .catch(err=>{
                console.log("Unable to encrypt password");
            })
        }
    })
    .catch(err=>{
        console.log("Unable to find user in signup");
    })
   
}