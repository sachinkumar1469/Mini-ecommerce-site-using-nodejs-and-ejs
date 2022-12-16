const express = require('express');
const router = express.Router();
const {addProductController,cartIndex,deleteProductController} = require('../controllers/cart');



router.use('/add-product',addProductController);
router.use('/delete-product/:productId',deleteProductController);
router.use('/',cartIndex)


exports.router = router;

