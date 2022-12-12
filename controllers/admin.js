const path = require('path');

const Products = require('../models/product')

exports.defaultAdminRoute = (req,res,next)=>{
        Products.findAll({})
            .then((result)=>{
                res.render(path.join(require.main.filename,'..','views','admin'),{products:result});
            })
            .catch((err)=>{
                console.log('unable to fetch products in admin to display')
            })
}

exports.addProductHandler = (req,res,next)=>{
    // console.log(req.body); 
    const {title,imageUrl,description,price} = req.body;
        Products.create({
            title,
            imageUrl,
            price:JSON.parse(price),
            description
        }).then(result=>{
            res.redirect('/admin');
        }).catch(err=>{
            console.log('error while adding new product')
        });   
}

exports.editProduct = (req,res,next)=>{
    // console.log(req.query);
    const productId = req.query.id;
    Products.findAll({
        where:{
            id:productId
        }
    })
    .then((result)=>{
        res.render(path.join(require.main.filename,'..','views','product','edit-product'),{product:result[0]});
    });
    
}

exports.updateProduct = (req,res,next)=>{
    // console.log(req.body);
        Products.update(
            {...req.body},
            {
                where:{
                    id:req.body.id
                }
            }
        )
        .then((result)=>{
            res.redirect('/admin');
        })
        .catch((err)=>{
            console.log('Error while updataing the product detalis')
        })
    
}

exports.deleteProduct = (req,res,next)=>{
    const productId = req.body.deleteId;
        Products.destroy({
            where:{
                id:productId
            }
        })
        .then((result)=>{
            res.redirect('/admin')
        })
        .catch(err=>{
            console.log('Unable to delete')
        })
}