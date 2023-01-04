const path = require('path');
const order = require('../models/order');
const Order = require('../models/order');
const User = require('../models/user');
const fs = require('fs');

const PDFDocument = require('pdfkit');


exports.checkout = (req,res,next)=>{
    
}


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
    req.session.user
    const userId = req.session.user._id;
    Order.find({userId:userId})
    .then(result=>{
        const orders = result.map(order=>{
            return order.items;
        })
        console.log(orders)

        res.render(path.join(require.main.filename,'..','views','order'),{orderArray:orders})
    })
            
       
}

exports.getOrderInvoice = (req,res,next)=>{
    
    const fileName = req.params.orderId + '.pdf';

    // fs.readFile(path.join("data","invoice",fileName),(err,data)=>{
    //     if(err){
    //         console.log("error in invoice file");
    //         return false
    //     }
    //     res.setHeader('Content-Type',"application/pdf");
    //     res.setHeader('Content-Disposition','inline; filename="invoice"')
    //     res.send(data);
    // })

    // const file = fs.createReadStream(path.join("data","invoice",fileName))
    res.setHeader("Content-Type",'application/pdf');
    res.setHeader('Content-Disposition','inline;filename="invoice"');
    // file.pipe(res);

    const p = path.join('data','invoice',fileName);

    const newPdf = new PDFDocument();

    // newPdf.pipe(fs.createWriteStream(p))
    newPdf.pipe(res);

    newPdf.fontSize(28).text("Invoice");

    newPdf.fontSize(12).text(`Order id is: ${req.params.orderId}`);

    newPdf.end();
    
}

