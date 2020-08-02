// Core Dependencies
const http = require("http");

// 3rd Dependencies
const express = require("express");

// Internal Dependencies
//...


const app = express();

// A method from ExpressJS to allow middleware
app.use((request, response, next) => {

    console.log("In the middleware!");
    next(); // A function to allow the request to continue to the next middleware in line
});

app.use((request, response, next) => {

    console.log("In another middleware");
});

const server = http.createServer(app);


server.listen = (8088);


