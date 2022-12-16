const path = require('path');
const Order = require('../models/order')
async function handleCreateOrder(req,res,next){

    // console.log(req.user,'eeeeeeeeeeeeeeeeee');
    // console.log(Order);
    Order.create({
        items:req.user.cart.items,
        userId:req.user._id
    }).then(result=>{
        req.user.cart.items = []
        req.user.updateCart().then(()=>{
            res.redirect("/cart");
        })
    })
}

exports.handleOrderController = (req,res,next)=>{
    // console.log(req.user.dataValues);
   handleCreateOrder(req,res,next);
}

exports.showOrderDetails = (req,res,next)=>{
    req.user.getOrder()
        .then(orders=>{
            console.log(orders);
            let orderArray = orders.map(order=>{
                return order.items
            })
            
            res.render(path.join(require.main.filename,'..','views','order'),{orderArray})
        }).catch(err=>{
            console.log("Unable to fetch order details",err)
        })
}

