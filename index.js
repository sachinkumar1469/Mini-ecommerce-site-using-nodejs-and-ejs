const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const csrf = require('csurf')
const MongoDbSessionStore = require('connect-mongodb-session')(session);


const App = express();

const csrfProtection = csrf();
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
const singupRoute = require('./routes/signup')

App.use(express.static(path.join(__dirname,'public'))); // to send the static file

App.set('view engine','ejs'); // To set template engine
App.set('views','views'); // To set folder for template engine files

App.use(bodyParser.urlencoded({extended:false})); // to parse the incoming request

App.use(session({secret:"Hello My Self Sachin Kumar",resave:false,saveUninitialized:false,store}))


App.use(cookieParser());

App.use(csrfProtection);
App.use((req,res,next)=>{
    res.locals.csrfToken = req.csrfToken();
    next();
})

App.use('/signup',singupRoute);

App.use((req,res,next)=>{
    // console.log(req.path.toString());
    if(req.path == "/login" || req.path == "/login/postlogin"){
        // console.log("Inside")
        next();
    } else if(req.session.user) {
        next();
    }else {
        res.redirect('/login');
    }
})
App.use('/admin',adminRouter.router);
App.use('/shop',shopRoutes);
App.use('/cart',cartRoutes.router)
App.use('/order',orderRoutes.router);
App.use('/product',productRoutes.router);
App.use('/login',loginRoutes);

App.use('/',(req,res,next)=>{
    console.log(req.session);
    // req.session.isSachin = true;
    // console.log(req.session.user);
    if(req.session.user){
        res.render(path.join(__dirname,'views','home'));   
    } else {
        res.redirect('/login')
    }
})


