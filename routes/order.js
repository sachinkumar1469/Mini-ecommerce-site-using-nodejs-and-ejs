const express = require('express');
const path = require('path');


const isAuth = require('../middleware/isAuth')
const {handleOrderController,showOrderDetails,getOrderInvoice,checkout} = require('../controllers/order')


const router = express.Router();


router.get('/checkout',checkout)
router.use('/order-details',showOrderDetails);
router.get('/:orderId',getOrderInvoice)
router.use('/',isAuth,handleOrderController)

exports.router = router;