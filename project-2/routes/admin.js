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
const productController = require("../controllers/product.js");

// Global variables
const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", productController.getAddProduct);

// /admin/add-product => POST
router.post("/add-product", productController.postAddProduct);

module.exports = router;

/// Or you can imports like this; but I prefer above.
// exports.routes = router;
// exports.products = products;

