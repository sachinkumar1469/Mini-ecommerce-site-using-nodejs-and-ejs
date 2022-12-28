const Schema = require('mongoose').Schema;

const places = new Schema({
    title:{
        type:Schema.Types.String,
        required:true
    },
    description:{
        type:Schema.Types.String,
        required:true
    },
    address:{
        type:Schema.Types.String,
        required:true
    },
    imageUrl:{
        type:Schema.Types.String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true
    },
})


const placeList = [
    {
        placeId:"122333445",
        imageUrl:"https://images.pexels.com/photos/3881102/pexels-photo-3881102.jpeg",
        title:"Hey Unnati",
        description:"Beautiful thick charming lady",
        address:"Unkown House, Unkown Road, Unkown State, India",
        userplaceId:"123451",
        coordinates:{lat:"-6.55521",lng:"-149.96366"},
    },
    {
        placeId:"123334455",
        imageUrl:"https://images.pexels.com/photos/3881102/pexels-photo-3881102.jpeg",
        title:"Hey Unnati",
        description:"Beautiful thick charming lady",
        address:"Unkown House, Unkown Road, Unkown State, India",
        userplaceId:"123451",
        coordinates:{lat:"-6.55521",lng:"-149.96366"},
    },
    {
        placeId:"122333455",
        imageUrl:"https://images.pexels.com/photos/3881102/pexels-photo-3881102.jpeg",
        title:"Hey Unnati",
        description:"Beautiful thick charming lady",
        address:"Unkown House, Unkown Road, Unkown State, India",
        userplaceId:"123452",
        coordinates:{lat:"-6.55521",lng:"-149.96366"},
    },
    {
        placeId:"12239334455",
        imageUrl:"https://images.pexels.com/photos/3881102/pexels-photo-3881102.jpeg",
        title:"Hey Unnati",
        description:"Beautiful thick charming lady",
        address:"Unkown House, Unkown Road, Unkown State, India",
        userplaceId:"123452",
        coordinates:{lat:"-6.55521",lng:"-149.96366"},
    },
    {
        placeId:"120334455",
        imageUrl:"https://images.pexels.com/photos/3881102/pexels-photo-3881102.jpeg",
        title:"Hey Unnati",
        description:"Beautiful thick charming lady",
        address:"Unkown House, Unkown Road, Unkown State, India",
        userplaceId:"123453",
        coordinates:{lat:"-6.55521",lng:"-149.96366"},
    },
    {
        placeId:"1223337655",
        imageUrl:"https://images.pexels.com/photos/3881102/pexels-photo-3881102.jpeg",
        title:"Hey Unnati",
        description:"Beautiful thick charming lady",
        address:"Unkown House, Unkown Road, Unkown State, India",
        userplaceId:"123454",
        coordinates:{lat:"-6.55521",lng:"-149.96366"},
    },
]

// module.exports = placeList;