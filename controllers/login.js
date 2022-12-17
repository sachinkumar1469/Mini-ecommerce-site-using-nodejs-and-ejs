const path = require('path');


exports.loginDefault = (req,res,next)=>{
    
    console.log(req.session.isLoggedIn)
    res.render(path.join(require.main.filename,'..','views','login'))
}

exports.postLogin = (req,res,next)=>{
    // res.setHeader('Set-Cookie','isLoggedIn=true');
    req.session.isLoggedIn = true;
    console.log(req.session.isLoggedIn)
    res.redirect('/home');
}

exports.postLogout = (req,res,next)=>{
    req.session.destroy((err)=>{
        if(err) console.log("Error while destroying session")
        res.redirect('/login')
    })
}