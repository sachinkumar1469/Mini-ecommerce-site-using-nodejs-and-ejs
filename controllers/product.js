const path = require('path');

const productModels = require('../models/product')
exports.defaultProductPath = (req,res,next)=>{
    res.send("Not Valid Product");
}


// This function is used to handle /product/:productId route it recieves an productId as param argument
exports.viewProductDetail = (req,res,next)=>{
    productModels.Product.getProductUsingId((productDetail)=>{
        //Product Detail is an array of objects
        // console.log(Array.isArray(productDetail));
        res.render(path.join(require.main.filename,'..','views','product','product-details'),{product:productDetail[0]})
    },req.params.productId)
    
}