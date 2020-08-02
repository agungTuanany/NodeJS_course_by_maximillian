"use strict";

// Core Dependencies
//...

// 3rd party Dependencies
const express = require("express");

// Internal Dependencies
//...

const app = express();

app.use("/", (request, response, next) => {

    console.log("This always runs!!");
    next();
});

app.use("/add-product", (request, response, next) => {

    console.log("In another middleware!");
    return response.send("<h1>The Add-Product page</h1>")

})

app.use("/", (request, response, next) => {

    console.log("In another middleware!");
    return response.send('<h1>Hello from Express!</h1>');
});

app.listen(8088);
