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

    const products = adminData.products;
    // Implement PUG as template engines
    response.render("shop", {
        products,
        pageTitle: "Shop Page",
        path: "/",
        hasProduct:  products.length> 0
    });
});

module.exports = router;
