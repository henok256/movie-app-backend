const mongoose = require('mongoose');


const movieSchema =  new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:false,
    },
    year:{
        type:String,
        required:true,
        unique:false
    },
    rated:{
        type:String,
        required: true,
        unique:false,

    },
    releasedDated:{
        type:String,
        required:true,
        unique:false,
    },
    runtime:{
        type:String,
        required:true,
        unique:false,
    },
    genre:{
        type:String,
        required:true,
        unique:false
    },
   
    director:{
        type:String,
        required:true,
        unique:false
    },

    actors:{
        type:String,
        required:true,
        unique:false
    },
    language:{
        type:String,
        required:true,
        unique:false
    },

    country:{
        type:String,
        required:true,
        unique:true
    },
    award:{
      type:String,
      required:false,
      unique:false
    },
    poster:{
        type:String,
        required:true,
        unique:true
    },


    imdbIDRating:{
      type:String,
      required:true,
      unique:true
    },
    imdbID:{
        type:String,
        required:true,
        unique:false,
    },
    images:[{
        type:String,
        required:true,
        unique:true,
    }],
  

  


});

const Movie = mongoose.model('Movie', movieSchema);
module.exports=Movie;