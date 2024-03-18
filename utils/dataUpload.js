const Movie = require("../models/Movie");


const  uploadMovies=  (async ()=> {

 try {

         // Find all movies in the database
    const movies = await Movie.find();

    // If there are no movies found, return a 404 status with a message
    if (!movies || movies.length === 0) {
        const moviesData = require("../data/movies.json"); // Assuming your JSON file is named movies.json and is located in the data directory
    
        // Loop through the movies data and save each movie to the database
        for (const movie of moviesData) {
          
          const newMovie = new Movie({
            title: movie.Title,
            year: movie.Year,
            rated: movie.Rated,
            releasedDated: movie.Released,
            runtime: movie.Runtime,
            genre: movie.Genre,
            director: movie.Director,
            actors: movie.Actors,
            language: movie.Language,
            country: movie.Country,
            award: movie.Awards,
            poster: movie.Poster,
            imdbIDRating: movie.imdbRating,
            imdbID: movie.imdbID,
            images:movie.Images
          });
    
          newMovie.save();
        }
          console.log("Movies saved successfully")
    }
      } catch (error) {
        console.error("Error in saving movies:", error);       
      }
    
});


module.exports= uploadMovies;
