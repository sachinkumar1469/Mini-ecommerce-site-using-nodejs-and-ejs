const path = require('path');
const userModel = require('../models/user')

exports.loginDefault = (req,res,next)=>{
    // console.log(req.session.isLoggedIn)
    res.render(path.join(require.main.filename,'..','views','login'))
}

exports.postLogin = (req,res,next)=>{
    // res.setHeader('Set-Cookie','isLoggedIn=true');
    const email = req.body.email;
    const password = req.body.password;
    userModel.find({email})
        .then(result=>{     
            if(result.length==0){
                console.log("Inside")
                return userModel.create({name:"Sachin Yadav",email,cart:{items:[]}})
                .then(newUser=>{
                    console.log(newUser);

                    req.session.user = newUser;
                    return newUser;
                })
                .catch(err=>{
                    console.log("Unable to create new user");
                    return err;
                })
            }else {                
                req.session.user = result[0];
                return result[0];
            }
            
        })
        .then((result)=>{
            req.session.cookie.isLoggedIn = true;
            res.redirect('/home');
        
        })
        .catch(err=>{
            console.log("Unable to find user by given id");
        })
    }

exports.postLogout = (req,res,next)=>{
    req.session.destroy((err)=>{
        if(err) console.log("Error while destroying session")
        res.redirect('/login')
    })
}