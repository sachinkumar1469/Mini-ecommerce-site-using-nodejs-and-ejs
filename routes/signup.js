const express = require('express')
const router = express.Router();
const {signUpController,postSignupController} = require('../controllers/signup')


router.post('/postSignup',postSignupController)
router.get('/',signUpController);


module.exports = router;