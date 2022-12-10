const adminImport = require('../routes/admin')
const products = require('../models/product')

exports.postAddProduct = (req,res,next)=>{
    // console.log(req.body);
    let product = new products.Product(req.body.title,req.body.imageUrl,req.body.productPrice);
    product.save();
    res.redirect('/');
}