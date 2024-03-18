const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();
require("dotenv").config();

app.use(cors());
const router = require("./Routes/userRoutes.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8585;
const mongoURI = process.env.mongoURI.toString();

app.use("/", router);

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
