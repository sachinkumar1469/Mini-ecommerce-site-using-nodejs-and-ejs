const path = require('path');

const mongodb = require('mongodb')
const productModel = require('../models/product')

exports.defaultAdminRoute = (req,res,next)=>{
    if(req.session.user){
        res.render(path.join(require.main.filename,'..','views','admin'));
    }else {
        res.redirect('/login')
    }         
}

exports.addProductHandler = (req,res,next)=>{
    console.log(req.file);
    // console.log(req.body); 
    // const userId = req.session.user._id;
    // const {title,imageUrl,description,price} = req.body;
    // productModel.create({title,price,imageUrl,description,userId})
    //     .then(result=>{
    //         console.log(result);
    //         res.redirect('/admin');
    //     })
    //     .catch(err=>{
    //         console.log(err);
    //     })
}

exports.editProduct = (req,res,next)=>{
    // console.log(req.query);
    const productId = req.query.id;
    productModel.findById(productId)
    .then((result)=>{
        // console.log(result);
        res.render(path.join(require.main.filename,'..','views','product','edit-product'),{product:result});
    });
    
}

exports.updateProduct = (req,res,next)=>{
    // console.log(req.body);
        productModel.findByIdAndUpdate(new mongodb.ObjectId(req.body.id),{...req.body})
            .then(result=>{
                console.log("Inside then")
                // console.log(result);
                res.redirect('/admin/products')
            })
            .catch(err=>{
                console.log("Unable to update product");
            })
        
    
}

exports.deleteProduct = (req,res,next)=>{
    const productId = req.body.deleteId;
    // console.log(productId);
    productModel.deleteOne({_id:new mongodb.ObjectId(productId)})
    .then(result=>{
        // console.log(result)
        res.redirect('/admin');
    })
    .catch(err=>{
        console.log("Error in deleting product");
    });
}

exports.adminProductRoute = (req,res,next)=>{
    productModel.find({})
            .then(result=>{
                res.render(path.join(require.main.filename,'..','views','admin-products'),{products:result});
                // console.log(result)
            }).catch(err=>{
                console.log("Error in fetching product")
            })
}