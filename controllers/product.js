const path = require('path');
const mongodb = require('mongodb')
const Products = require('../models/product_mongodb')
const productModel = require('../models/product')
exports.defaultProductPath = (req,res,next)=>{
    res.send("Not Valid Product");
}


// This function is used to handle /product/:productId route it recieves an productId as param argument
exports.viewProductDetail = (req,res,next)=>{
    const productId = req.params.productId;
    
    productModel.findById(new mongodb.ObjectId(productId))
    .then(product=>{
        res.render(path.join(require.main.filename,'..','views','product','product-details'),{product})
    })
    .catch(err=>{
        console.log("Error in fetchin product details")
    })
}