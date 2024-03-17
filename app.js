const express = require('express');
const router =require('./Routes/userRoutes.js');
const app= express();

const PORT =8080;

app.use('/', router);









app.listen(PORT, ()=>{
    console.log(`the server is running on port ${PORT}`)
})


