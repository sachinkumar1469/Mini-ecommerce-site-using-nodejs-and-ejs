const path = require('path');
const userModel = require('../models/user');
const bcrypt = require('bcryptjs')

exports.loginDefault = (req,res,next)=>{
    // console.log(req.session.isLoggedIn)
    // console.log(req.csrfToken());
    // let csrfToken = req.csrfToken();
    // console.log(csrfToken);
    res.render(path.join(require.main.filename,'..','views','login'),{isExist:true})
}

exports.postLogin = (req,res,next)=>{
    // res.setHeader('Set-Cookie','isLoggedIn=true');
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    userModel.findOne({email})
        .then(result=>{
            if(result){
                bcrypt.compare(password,result.password)
                    .then(hashPassResult=>{
                        if(hashPassResult){
                            req.session.user = result;
                            res.redirect('/');
                        } else {
                            res.render(path.join(require.main.filename,'..','views','login'),{isExist:false,csrfToken:req.csrfToken()})
                        }
                    })
                    .catch(err=>{
                        console.log("Password doesn't match in login decrypt")
                    })
            }else {
                res.render(path.join(require.main.filename,'..','views','login'),{isExist:false})
            }
        })
        
}

exports.postLogout = (req,res,next)=>{
    req.session.destroy((err)=>{
        if(err) console.log("Error while destroying session")
        res.redirect('/login')
    })
}