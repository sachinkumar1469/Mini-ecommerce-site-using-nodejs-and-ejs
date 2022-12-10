const path = require('path');

// Import model product file to get the product data
const productModel = require('../models/product')

exports.shopMainController = (req,res,next)=>{
    const p = path.join(require.main.filename,'..','views','shop');
    const products = productModel.Product.getProducts((productsArray=[])=>{
        res.render(p,{products:productsArray})
    })
}