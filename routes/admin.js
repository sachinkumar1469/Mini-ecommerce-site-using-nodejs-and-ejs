const express = require('express')
const router = express.Router();
const path = require('path')

const {defaultAdminRoute,addProductHandler,editProduct,updateProduct,deleteProduct,adminProductRoute} = require('../controllers/admin');





router.use('/add-product',addProductHandler);

router.use('/edit-product',editProduct);
router.use('/update-product',updateProduct)
router.use('/delete',deleteProduct);
router.use('/products',adminProductRoute)
router.use('/',defaultAdminRoute);

exports.router = router;