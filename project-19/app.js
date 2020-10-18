"use strict"

// 3rd party Dependencies
const express    = require("express");
const bodyParser = require("body-parser");

// Internal Dependencies
const feedRoutes = require("./router/feed.js");

// Global variables
const app  = express()
const port = 8081;

// app.use(bodyParser.urlencoded());    // for: x-www-form-urlencoded <form>
app.use(bodyParser.json())              // for: application/json

app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    response.setHeder("Access-Control-Allow-Headers", "Content-Type, Authorization");

    next();
});

app.use("/feed", feedRoutes)



app.listen(port, () => console.log(`You run "project-19" in server running by "Express" in port: "${port}".`));
