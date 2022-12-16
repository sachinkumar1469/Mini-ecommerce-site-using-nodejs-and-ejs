const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const mongoose = require('mongoose')
const App = express();


// MongoDB

// const {mongoConnect} = require('./utils/database');  // raw mongodb config
// mongoConnect(()=>{
    //     // console.log(result);
//     App.listen(8081);
// })

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


App.set('view engine','ejs'); // To set template engine
App.set('views','views'); // To set folder for template engine files


App.use(bodyParser.urlencoded({extended:false})); // to parse the incoming request

App.use(express.static(path.join(__dirname,'public'))); // to send the static file

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

App.use('/',(req,res,next)=>{
    res.render(path.join(__dirname,'views','home'));   
})


