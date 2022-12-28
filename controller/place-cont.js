let PLACES = require('../model/place-model')

const HttpError = require('../model/http-error');
const {v4} = require('uuid');
const { validationResult } = require('express-validator');
const getCoord = require('../utils/coordinatesApi');

exports.placesMain = (req,res,next)=>{
    res.json(PLACES)
}

exports.getPlacesByPlaceId = (req,res,next)=>{
    console.log(req.params);
    const placeId = req.params.placeId;
    const placeItem = PLACES.find((place)=>{
        return place.placeId == placeId;
    });

    if(!placeItem){
        throw new HttpError("Can't find place by given pid... Error using error model",302);
    }

    res.json(placeItem);
}

exports.getPlacesByUserId = (req,res,next)=>{
    console.log(req.params);
    const userId = req.params.userId;
    const userPlaces = PLACES.filter(place=>{
        return place.userId == userId;
    })

    res.json(userPlaces);
}

exports.createPlace = (req,res,next)=>{
    const vaErr = validationResult(req);
    if(vaErr.array().length){
        throw new HttpError("Invalid Inputs",302);
    }
    // console.log(vaErr)
    const {title,description,address,userId,imageUrl} = req.body;
    const newPlace = {
        placeId: v4(),
        title,
        description,
        address,
        coordinates:getCoord(address),
        userId,
        imageUrl
    }
    PLACES.push(newPlace);
    console.log(PLACES.length);
    res.status(201).json(newPlace);
}

exports.deletePlaceById = (req,res,next)=>{
    const {placeId} = req.params;
    PLACES = PLACES.filter(place=>place.placeId != placeId);
    res.json({"Hello":"Deleted"})
}

exports.updatePlaceById = (req,res,next)=>{
    const vaErr = validationResult(req);
    if(vaErr.array().length){
        throw new HttpError("Invalid Inputs in patch",302);
    }
    const {placeId} = req.params;
    const {title,description,address,coordinates,userId,imageUrl} = req.body;
    console.log(placeId);
    const index = PLACES.findIndex(place=>place.placeId == placeId)
    PLACES[index] = {
        ...PLACES[index],
        title,
        description
    }
    console.log(PLACES[index]);
    res.json(PLACES[index])
}