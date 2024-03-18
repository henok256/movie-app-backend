const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyJWT = require("../utils/verification");
const Movie = require("../models/Movie");

// Route for user registration (Sign up)
router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);

    const { username, email, password, confirmedPassword } = req.body;

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password !== confirmedPassword) {
      return res.status(400).json({ message: "passwords are not matched" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    let user = await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.secret, {
      expiresIn: "1h",
    });
    res.status(201).json({ token });
  } catch (error) {
    console.error("Error in sign up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/protected", verifyJWT, (req, res) => {
  // Access user data from req.user if attached
  console.log("User:", req.user);
  // Handle the request logic for protected resource
  res.send("This is a protected resource!");
});
router.get("/unprotected", (req, res) => {
  res.send("This is a unprotected resource!");
});
router.post("/saveMovies", async (req, res) => {
  try {
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
        images: movie.Images,
      });

      await newMovie.save();
    }

    res.status(200).json({ message: "Movies saved successfully" });
  } catch (error) {
    console.error("Error in saving movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
