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

const router = express.Router();

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
    console.log(request.body);
    return response
        .status(302)
        .redirect("/");
});

module.exports = router;
