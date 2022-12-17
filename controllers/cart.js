const {Cart} = require('../models/cart')
const CartItems = require('../models/cart-item');
const Product = require('../models/product');
const mongodb = require('mongodb')
const path = require('path');
const User = require('../models/user');


exports.addProductController =  (req,res,next)=>{
    // console.log(req.body);
    // console.log("Hiiiiiiiiii")
    // console.log(req.session.user);
    User.findById(req.session.user._id).then(result=>{
        // console.log(result);
        let productId = req.body.productId;
        req.session.user = result;
        const returnresult = result.addToCart(productId,()=>{
            res.redirect('/shop')
        });   
    })
}



exports.cartIndex = (req,res,next)=>{
    // console.log(req.user.cart.items);
    const result = req.session.user.cart.items.map(item=>{
        return {id:item.productId,qty:item.quantity}
    })
    // console.log(result)
    let productArray = result.map(item=>{
        return item.id
    })
    // console.log(productArray)
    Product.find({_id: {$in: productArray}}).then(resultt=>{
        let productss = resultt.map((prod,ind)=>{
            return {...prod._doc,qty:result[ind].qty}
        })
        // console.log(productss)
        res.render(path.join(require.main.filename,'..','views','cart'),{products:productss}) 
    })
    .catch(err=>{console.log("Unable to find by array")})
}

async function handleDeleteReques(req,res,next){   
    let productId =  req.params.productId;
    // console.log(productId);
    // console.log(req.user.cart.items);
    const newCart = req.session.user.cart.items.filter(item=>{
        return item.productId.toString() !== productId.toString();
    })
    req.session.user.cart.items = newCart;
    req.session.user.updateCart(newCart,(result)=>{
        // console.log(result)
        res.redirect('/cart');
    })
}

exports.deleteProductController=(req,res,next)=>{
    handleDeleteReques(req,res,next);
}