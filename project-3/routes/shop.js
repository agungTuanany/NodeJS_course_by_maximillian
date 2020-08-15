"use strict";

/*
 * A router for users | client side.
 *
 */

// Core Dependencies
const path = require("path");

// 3rd party Dependencies
const express = require("express");

// Internal Dependencies
const productController = require("../controllers/product.js");
const customerController = require("../controllers/shop.js");

// Global variables
const router = express.Router();

// "/" => GET
router.get("/", customerController.getIndex);

// "/products" => GET
router.get("/products", productController.getProduct);

// "/products" => GET
router.get("/cart", customerController.getCart);

module.exports = router;
