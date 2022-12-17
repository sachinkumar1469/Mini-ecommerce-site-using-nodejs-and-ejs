const path = require('path');
const Order = require('../models/order');
const User = require('../models/user')
async function handleCreateOrder(req,res,next){

    // console.log(req.user,'eeeeeeeeeeeeeeeeee');
    // console.log(Order);
    Order.create({
        items:req.session.user.cart.items,
        userId:req.session.user._id
    }).then(result=>{
        User.findById(req.session.user._id).then(resultUser=>{
            resultUser.cart.items = [];
            
            resultUser.updateCart().then(()=>{
                req.session.user = resultUser;
                res.redirect("/cart");
            })
        })
    })
}

exports.handleOrderController = (req,res,next)=>{
    // console.log(req.user.dataValues);
   handleCreateOrder(req,res,next);
}

exports.showOrderDetails = (req,res,next)=>{
    req.session.user.getOrder()
        .then(orders=>{
            // console.log(orders);
            let orderArray = orders.map(order=>{
                return order.items
            })
            
            res.render(path.join(require.main.filename,'..','views','order'),{orderArray})
        }).catch(err=>{
            console.log("Unable to fetch order details",err)
        })
}

