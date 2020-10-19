"use strict"

// 3rd party Dependencies
const express    = require("express");
const bodyParser = require("body-parser");
const mongoose   = require("mongoose");

// Internal Dependencies
const feedRoutes = require("./router/feed.js");

// Global variables
const app  = express()
const port = 8081;

const MONGODB_URI = "mongodb+srv://daun:bMSKaebmN7o4Tmsk@udemy-nodejs-maximillia.tz0sa.mongodb.net/rest-api-max-course?retryWrites=true&w=majority"

// app.use(bodyParser.urlencoded());    // for: x-www-form-urlencoded <form>
app.use(bodyParser.json())              // for: application/json

app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    next();
});

app.use("/feed", feedRoutes)



// Mongoose
mongoose.connect(MONGODB_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(result => {

        console.log("Succeeds connect with MongoDB database with mongoose")
        app.listen(port, () => console.log(`You run "project-19" in server running by "Express" in port: "${port}".`));
    })
    .catch(err => console.log(err));
