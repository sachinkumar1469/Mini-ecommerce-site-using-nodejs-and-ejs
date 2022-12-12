const path = require('path');

const Products = require('../models/product')
exports.defaultProductPath = (req,res,next)=>{
    res.send("Not Valid Product");
}


// This function is used to handle /product/:productId route it recieves an productId as param argument
exports.viewProductDetail = (req,res,next)=>{
    const productId = req.params.productId;
    
    Products.findAll({
        where:{
            id:productId
        }
    })
    .then((result)=>{
        
        res.render(path.join(require.main.filename,'..','views','product','product-details'),{product:result[0]})
    })
    .catch((err)=>{
        console.log('unable to fetch product using id in show detail page')
    })  
}