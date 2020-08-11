"use strict";

/*
 * A router for admin | as system administrator
 *
 */


// Core Dependencies
const path = require("path");

// 3rd party Dependencies
const express = require("express");

// Internal Dependencies
const rootDir = require("../lib/path.js");

// Global variables
const router = express.Router();
const products = [];

// /admin/add-product => GET
router.get("/add-product", (request, response, next) => {

    return response
        .status(200)
        .render("add-product", {
            docTitle: "Add Product"
        });
});

// /admin/add-product => POST
router.post("/add-product", (request, response, next) => {

    products.push({
        title: request.body.title
    });

    return response.status(302).redirect("/");
});

module.exports = {
    routes: router,
    products: products
};

/// Or you can imports like this; but I prefer above.
// exports.routes = router;
// exports.products = products;

/*
 * XXX  NOTE FIXME:
 * @param product.push() is returning with a new array; caused the data can be seen
 * with unauthorized requested user; That cause the @param requested.body.title
 * is always stream until the server reloaded. This a BAD APPROACH!!
 * XXX
 */
