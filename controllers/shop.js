const path = require('path');
const Products = require('../models/product')
// Import model product file to get the product data
const productModel = require('../models/product')

exports.shopMainController = (req,res,next)=>{
    const p = path.join(require.main.filename,'..','views','shop');
    Products.findAll()
            .then((result)=>{
                res.render(p,{products:result});
            })
            .catch(err=>{
                console.log('unable to fetch products in shop')
            })
}