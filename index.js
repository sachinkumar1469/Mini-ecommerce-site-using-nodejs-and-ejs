const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const App = express();
App.listen(8081);

const adminModule = require('./routes/admin');

const shopRoutes = require('./routes/shop');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/product');

const db = require('./utils/database');

App.set('view engine','ejs'); // To set template engine
App.set('views','views'); // To set folder for template engine files

// db.execute('SELECT * FROM products').then((result)=>{
//     console.log(result[0]);
//     console.log(result[0].length)
// }).catch((err)=>{
//     console.log(err);
// });

App.use(bodyParser.urlencoded({extended:false})); // to parse the incoming request

App.use(express.static(path.join(__dirname,'public'))); // to send the static file

App.use('/admin',adminModule.router);
App.use('/shop',shopRoutes);
App.use('/cart',cartRoutes.router)
App.use('/order',orderRoutes.router);
App.use('/product',productRoutes.router);

App.use('/',(req,res,next)=>{
    res.render(path.join(__dirname,'views','home'))
})