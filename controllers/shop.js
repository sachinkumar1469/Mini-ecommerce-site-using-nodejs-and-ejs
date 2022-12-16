const path = require('path');
const Products = require('../models/product_mongodb')
// Import model product file to get the product data
const productModel = require('../models/product')

exports.shopMainController = (req,res,next)=>{
    const p = path.join(require.main.filename,'..','views','shop');
    
    productModel.find()
    .then((result)=>{
        res.render(p,{products:result})
    })
    .catch((err)=>{
        console.log("Error in fetching products");
    })
}