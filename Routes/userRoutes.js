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
      role:"customer"
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

router.get('/users', async (req, res) => {

  try {
    const users = await User.find({});
    if (users.length > 0) { 
      return res.status(200).json({ users });
    } 
    else {
      return res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
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







router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const upDatedData = req.body;
    const updateUser = await User.findByIdAndUpdate(id, upDatedData, {
      new: true,
    });

    if (!updateUser) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(updateUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
