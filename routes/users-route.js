const express = require('express');

const router = express.Router();
const {check} = require('express-validator');

const {userMain,userSignup,userLogin} = require('../controller/user-cont')

router.get('/',userMain);

router.post('/login',userLogin);

router.post('/signup',[
    check('email').isEmail()
],userSignup)

module.exports = router;