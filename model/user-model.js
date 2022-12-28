const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
  name:{
    type:Schema.Types.String,
    required:true,
  },
  imageUrl:{
    type:Schema.Types.String,
    required:true,
  },
  email:{
    type:Schema.Types.String,
    required:true,
  },
  password:{
    type:Schema.Types.String,
    required:true,
  },
});


module.exports = mongoose.model("Users",user);




























const USERS = [
    {
      userId:"123451", 
      name:"Unnati",
      imageUrl:"https://pbs.twimg.com/media/FkmWba4UEAELwYq?format=jpg",
      lastPlaceImageUrl:"https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg",
      placeCount:5
    },
    {
      userId:"123452", 
      name:"Unnati",
      imageUrl:"https://pbs.twimg.com/media/FkmWba4UEAELwYq?format=jpg",
      lastPlaceImageUrl:"https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg",
      placeCount:5
    },
    {
      userId:"123453", 
      name:"Unnati",
      imageUrl:"https://pbs.twimg.com/media/FkmWba4UEAELwYq?format=jpg",
      lastPlaceImageUrl:"https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg",
      placeCount:5
    },
    {
      userId:"123454", 
      name:"Unnati",
      imageUrl:"https://pbs.twimg.com/media/FkmWba4UEAELwYq?format=jpg",
      lastPlaceImageUrl:"https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg",
      placeCount:5
    },
    {
      userId:"123455", 
      name:"Unnati",
      imageUrl:"https://pbs.twimg.com/media/FkmWba4UEAELwYq?format=jpg",
      lastPlaceImageUrl:"https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg",
      placeCount:5
    },
    {
      userId:"123456", 
      name:"Unnati",
      imageUrl:"https://pbs.twimg.com/media/FkmWba4UEAELwYq?format=jpg",
      lastPlaceImageUrl:"https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg",
      placeCount:5
    },
  ]

// module.exports = USERS;