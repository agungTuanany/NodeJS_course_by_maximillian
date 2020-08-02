"use strict";

/*
 * A router for users | client side.
 */

// 3rd party Dependencies
const express = require("express");

const router = express.Router()

router.get("/", (request, response, next) => {

    console.log("In '/' user middleware!");
    return response.send('<h1>Hello from Express!</h1>');
});

module.exports = router;
