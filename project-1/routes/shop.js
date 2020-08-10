"use strict";

/*
 * A router for users | client side.
 */

// Core Dependencies
const path = require("path");

// 3rd party Dependencies
const express = require("express");

// Internal Dependencies
const rootDir = require("../lib/path.js");
const adminData = require("./admin.js");

// Global variables
const router = express.Router();

router.get("/", (request, response, next) => {

    // console.log("In '/' user middleware!");
    // console.log("shop.js ====>", adminData.products);
    // return response
    //     .status(200)
    //     .sendFile(path.join(rootDir, "views", "shop.html"));

    // Implement PUG as template engines
    response.render("shop")
});

module.exports = router;
