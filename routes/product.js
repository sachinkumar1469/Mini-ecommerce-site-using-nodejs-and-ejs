const express = require('express');
const router = express.Router();
const {defaultProductPath,viewProductDetail} = require('../controllers/product');

router.use('/:productId',viewProductDetail)
router.use('/',defaultProductPath)
exports.router = router;