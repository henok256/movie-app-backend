const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
   
  },
  year: {
    type: String,
    required: true,
  
  },
  rated: {
    type: String,
    required: false,
    
  },
  releasedDated: {
    type: String,
    required: false,
   
  },
  runtime: {
    type: String,
    required: false,
    
  },
  genre: {
    type: String,
    required: true,
   
  },

  director: {
    type: String,
    required: true,
   
  },

  actors: {
    type: String,
    required: true,
    
  },
  language: {
    type: String,
    required: false,
    
  },

  country: {
    type: String,
    required: true,
 
  },
  award: {
    type: String,
    required: false,
  
  },
  poster: {
    type: String,
    required: false,
    
  },

  imdbIDRating: {
    type: String,
    required: false,
  
  },
  trailer:{
    type:String,
    required:false,

  },
  imdbID: {
    type: String,
    required: false,
   
  },
  images: [
    {
      type: String,
      required: false,
     
    },
  ],
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
