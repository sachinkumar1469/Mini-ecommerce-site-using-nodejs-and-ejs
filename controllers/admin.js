const path = require('path');
const db = require('../utils/database');
const productModels = require('../models/product')

exports.defaultAdminRoute = (req,res,next)=>{
    productModels.Product.getProducts((productsData)=>{
        // console.log(productsData)
        res.render(path.join(require.main.filename,'..','views','admin'),{products:productsData});
    })
}

exports.addProductHandler = (req,res,next)=>{
    // console.log(req.body); 
    const newProd = new productModels.Product({...req.body});
    newProd.save(()=>{
        res.redirect('/admin')
    })
}

exports.editProduct = (req,res,next)=>{
    // console.log(req.query);
    productModels.Product.getProductUsingId((productData)=>{
        res.render(path.join(require.main.filename,'..','views','product','edit-product'),{product:productData[0]});
    },req.query.id);
}

exports.updateProduct = (req,res,next)=>{
    // console.log(req.body);
    productModels.Product.updateProduct({...req.body},()=>{
        res.redirect('/admin');
    })
}

exports.deleteProduct = (req,res,next)=>{
    console.log(req.body);
    productModels.Product.deleteProduct(JSON.parse(req.body.deleteId),()=>{
        res.redirect('/admin')
    });
}