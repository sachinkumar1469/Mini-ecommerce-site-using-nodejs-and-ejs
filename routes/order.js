const express = require('express');
const router = express.Router();

router.use('/',(req,res,next)=>{
    res.render();
})

exports.router = router;