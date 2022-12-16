const express = require('express');
const path = require('path');
const {handleOrderController,showOrderDetails} = require('../controllers/order')


const router = express.Router();



router.use('/order-details',showOrderDetails)
router.use('/',handleOrderController)

exports.router = router;