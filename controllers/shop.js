const path = require('path');
const Products = require('../models/product_mongodb')
// Import model product file to get the product data
const productModel = require('../models/product');



const ITEM_PER_PAGE = 4;

exports.shopMainController = (req,res,next)=>{
    const p = path.join(require.main.filename,'..','views','shop');

    let p1 = req.query.page || 1
    
    const page = JSON.parse(p1);


    
    
    productModel.find().skip((page-1) * ITEM_PER_PAGE).limit(ITEM_PER_PAGE)
    .then((result)=>{
        res.render(p,{products:result})
    })
    .catch((err)=>{
        console.log("Error in fetching products");
    })
}