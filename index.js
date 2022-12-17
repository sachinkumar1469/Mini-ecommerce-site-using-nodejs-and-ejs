const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDbSessionStore = require('connect-mongodb-session')(session)

const App = express();
const store = new MongoDbSessionStore({
    uri:'mongodb+srv://sachinyadav1469:Sachin%40123@cluster0.my3twen.mongodb.net/shop2?retryWrites=true&w=majority'
    ,collection:'session'
});

mongoose.connect('mongodb+srv://sachinyadav1469:Sachin%40123@cluster0.my3twen.mongodb.net/shop2?retryWrites=true&w=majority')
.then(result=>{
    // console.log(result);
    App.listen(8081);
})
.catch(err=>{
    console.log(err)
})

const userModel = require('./models/user');


const productModel = require('./models/product');

const adminRouter = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/product');
const loginRoutes = require('./routes/login');

App.use(express.static(path.join(__dirname,'public'))); // to send the static file

App.set('view engine','ejs'); // To set template engine
App.set('views','views'); // To set folder for template engine files

App.use(bodyParser.urlencoded({extended:false})); // to parse the incoming request

App.use(session({secret:"Hello My Self Sachin Kumar",resave:false,saveUninitialized:false,store}))


App.use(cookieParser());
// App.use(function (req, res, next) {
//     // check if client sent cookie
//     console.log(req.path)
//     var cookie = req.cookies.isAuth;
//     if (cookie === undefined) {
//       // no: set a new cookie
//       var isAuth = true;
      
//       res.cookie('isAuth',isAuth, { maxAge: 900000, httpOnly: true });
//       console.log('cookie created successfully');
//     } else {
//       // yes, cookie was already present 
//       console.log('cookie exists', cookie);
//     } 
//     next(); // <-- important!
//   });

App.use((req,res,next)=>{
    userModel.find({email:'sachinyadav1469@gmail.com'})
        .then(result=>{
            // console.log(result,"outside");
            if(result.length==0){
                console.log("Inside")
                userModel.create({name:"Sachin Yadav",email:'sachinyadav1469@gmail.com',cart:{items:[]}})
                .then(newUser=>{
                    
                    req.user = newUser;
                    // console.log(newUser,"new userrrrrrrrrrrrrrrrrrr");
                    next();
                })
                .catch(err=>{
                    console.log("Unable to create new user");
                })
            }else {
                req.user = result[0];
                next();
            }
            
        })
        .catch(err=>{
            console.log("Unable to find user by given id");
        })
})

App.use('/admin',adminRouter.router);
App.use('/shop',shopRoutes);
App.use('/cart',cartRoutes.router)
App.use('/order',orderRoutes.router);
App.use('/product',productRoutes.router);
App.use('/login',loginRoutes);

App.use('/',(req,res,next)=>{
    // console.log(req.session.isLoggedIn)
    
    res.render(path.join(__dirname,'views','home'));   
})


