const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyJWT = require("../utils/verification");
const Movie = require("../models/Movie");


router.get("/search", async (req, res) => {
    try {
      let { number, title, year, genre, director, imdbIDRating } = req.query;
  
      // Construct the search query
      const searchQuery = {};
      if (title) searchQuery.title = { $regex: new RegExp(title, "i") };
      if (year) searchQuery.year = year;
      if (genre) searchQuery.genre = { $regex: new RegExp(genre, "i") };
      if (director) searchQuery.director = { $regex: new RegExp(director, "i") };
      if (imdbIDRating) searchQuery.imdbIDRating = imdbIDRating;
  
      // Find movies based on the search query
      const movies = await Movie.find(searchQuery);
  
      // If no movies are found, return a message
      if (!movies || movies.length === 0) {
        return res.status(404).json({ message: "No movies found" });
      }
      if (!number) {
        number = movies.length;
      }
  
      // Return the found movies
      res.status(200).json(movies.splice(0, number));
    } catch (error) {
      console.error("Error in searching movies:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  router.get("/singleMovie", async (req, res) => {
    try {
      let { title } = req.query;
  
      // Construct the search query
      const searchQuery = {};
      if (title) searchQuery.title = title;
      // Find movies based on the search query
      const movies = await Movie.find(searchQuery);
  
      // If no movies are found, return a message
      if (!movies || movies.length === 0) {
        return res.status(404).json({ message: "No movies found" });
      }
  
      // Return the found movies
      res.status(200).json(movies.splice(0, 1));
    } catch (error) {
      console.error("Error in searching movies:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  router.post("/add", verifyJWT, async (req, res, next) => {
    try {
      const {
        title,
        year,
        rated,
        runtime,
        genre,
        director,
        actors,
        country,
        poster,
        images,
      } = req.body;
      const newMovie = new Movie({
        title: title,
        year: year,
        rated: rated,
        runtime: runtime,
        genre: genre,
        director: director,
        actors: actors,
        country: country,
        poster: poster,
        images: images,
      });
  
      await newMovie.save();
      res.status(201).json({ message: "Movie added successfully" });
    } catch (error) {
      console.error("Error adding movie:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


router.put("/update/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const upDatedData = req.body;
      const updateMovie = await Movie.findByIdAndUpdate(id, upDatedData, {
        new: true,
      });
  
      if (!updateMovie) {
        return res.status(404).json({ message: "Movie not found" });
      }
  
      res.status(200).json(updateMovie);
    } catch (error) {
      console.error("Error updating movie:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await Movie.findByIdAndDelete(id);
      res.send("Deletion of the movie is successful");
    } catch (error) {
      console.log("Unable to delete", error);
      res.status(500).json({ message: "Internal Error" });
    }
  });

  module.exports = router;