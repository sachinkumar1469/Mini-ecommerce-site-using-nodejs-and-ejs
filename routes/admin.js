const express = require('express')
const router = express.Router();
const path = require('path')
const bodyParser = require('body-parser');
const product = require('../controllers/product')
const productData = require('../models/product')


router.use('/add-product',product.postAddProduct)

router.use('/edit-product',()=>{})
router.use('/update-product',()=>{})

router.use('/',()=>{});

exports.router = router;