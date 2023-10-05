require('dotenv').config();

const express = require("express");
const app = express();

//for user routes
const userRoute = require("./routes/userRoute");
app.use('/',userRoute);

app.listen(3000,function(){
    console.log("Server is running");
});