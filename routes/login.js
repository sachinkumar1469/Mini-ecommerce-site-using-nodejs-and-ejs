const express = require('express');
const router = express.Router();
const {loginDefault,postLogin,postLogout} = require('../controllers/login')
router.use('/postlogin',postLogin)
router.use('/logout',postLogout)
router.use('/',loginDefault);



module.exports = router;