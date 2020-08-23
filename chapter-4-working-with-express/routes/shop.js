"use strict";

/*
 * A router for users | client side.
 */

// Core Dependencies
const path = require("path")

// 3rd party Dependencies
const express = require("express");

// Internal Dependencies
const rootDir = require("../lib/path.js");

const router = express.Router();

router.get("/", (request, response, next) => {

    console.log("In '/' user middleware!");
    return response
        .status(200)
        .sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
