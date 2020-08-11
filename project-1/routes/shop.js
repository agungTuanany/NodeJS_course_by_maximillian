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

    // Implement PUG as template engines
    response.render("shop", {
        products: adminData.products,
        docTitle: "Shop Page"
    });
});

module.exports = router;
