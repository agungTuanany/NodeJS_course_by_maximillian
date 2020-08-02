"use strict";

/*
 * A router for users | client side.
 */
// Core Dependencies
const path = require("path")

// 3rd party Dependencies
const express = require("express");

const router = express.Router();

router.get("/", (request, response, next) => {

    console.log("In '/' user middleware!");

    return response.sendFile(path.join(__dirname, "./../views/", "shop.html"));

    // return response
    //     .status(202)
    //     .send('<h1>Hello from Express!</h1>');
});

module.exports = router;
