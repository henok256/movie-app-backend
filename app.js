const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/userRoutes.js");
const app = express();

const PORT = 8080;

app.use("/", router);

app.get("/test", (req, res, next) => {
  const mongoURI = "mongodb://localhost:27017/your_database_name"; // Replace with your database name

  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB", err));
});
app.listen(PORT, () => {
  console.log(`the server is running on port ${PORT}`);
});
