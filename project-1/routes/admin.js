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

    console.log("In '/admin/add-product' admin middleware!");
    return response
        .status(200)
        .sendFile(path.join(rootDir, "views", "add-product.html"));
});

// /admin/add-product => POST
router.post("/add-product", (request, response, next) => {

    console.log("in '/admin/product' admin middleware!");
    console.log("admin.js request.body.title:", request.body.title);

    /** XXX NOTE:
     Disadvantage by using .push() is returning with a new array; caused the
     data can be seen with unauthorized requested user; That cause the
     `request.body.title` is always stream until the server reloaded with hard
     reload; this is a BAD APPROACH!!.
    XXX */
    products.push({
        title: request.body.title
    });

    return response.status(302).redirect("/");
});

module.exports = {
    routes: router,
    products: products

}

/// Or you can imports like this | but I prefer above.
// exports.routes = router;
// exports.products = products;
