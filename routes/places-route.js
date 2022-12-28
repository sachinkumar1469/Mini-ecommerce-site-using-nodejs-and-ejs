const express = require('express');

const router = express.Router();
const {check} = require('express-validator');

const {placesMain,deletePlaceById,updatePlaceById,getPlacesByUserId,getPlacesByPlaceId,createPlace} = require('../controller/place-cont')

// router.get('/',placesMain);

router.get('/user/:userId',getPlacesByUserId);

router.get("/:placeId",getPlacesByPlaceId);

router.patch("/:placeId",[
    check("title")
    .not().
    isEmpty(),
    check("description")
    .isLength({min:5})
],updatePlaceById)

router.delete('/:placeId',deletePlaceById)

router.post('/',[
    check('title')
    .not()
    .isEmpty(),
    check("description")
    .isLength({'min':5}),
    check("address")
    .isLength({min:5}),

],createPlace);

module.exports = router;