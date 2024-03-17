const mongoose = require("mongoose");
const express = require("express");
require('dotenv').config();


const router = require("./Routes/userRoutes.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const PORT = 8585;
const mongoURI="mongodb://localhost:27017";


app.use("/", router);


//const mongoURI = "mongodb://localhost:27017";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


   mongoose.connect(mongoURI, { ...options }) 
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });





