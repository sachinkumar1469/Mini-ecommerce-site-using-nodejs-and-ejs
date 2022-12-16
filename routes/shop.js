const express = require('express')
const router = express.Router();
const path = require('path');

//Controller Imports
const {shopMainController} = require('../controllers/shop')

router.use('/',shopMainController);

module.exports = router;