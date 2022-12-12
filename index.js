const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const sequelize = require('./utils/database');

const App = express();

sequelize.sync()
    .then(res=>{
        // This function start the sever only when connection to database is establishes o/w not.
        App.listen(8081);       
    })
    .catch(err=>console.log('error in sync'));


const adminModule = require('./routes/admin');

const shopRoutes = require('./routes/shop');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/product');


App.set('view engine','ejs'); // To set template engine
App.set('views','views'); // To set folder for template engine files



App.use(bodyParser.urlencoded({extended:false})); // to parse the incoming request

App.use(express.static(path.join(__dirname,'public'))); // to send the static file

App.use('/admin',adminModule.router);
App.use('/shop',shopRoutes);
App.use('/cart',cartRoutes.router)
App.use('/order',orderRoutes.router);
App.use('/product',productRoutes.router);

App.use('/',(req,res,next)=>{
   
    res.render(path.join(__dirname,'views','home'));

    
})
