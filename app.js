const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();
const uploadMovies = require("./utils/dataUpload.js");
require("dotenv").config();

app.use(cors());
const userRouter = require("./Routes/userRoutes.js");
const movieRouter = require("./Routes/movieRoutes.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8585;
const mongoURI = process.env.mongoURI.toString();

app.use("/user", userRouter);
app.use("/movie", movieRouter);

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected");
    uploadMovies();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
