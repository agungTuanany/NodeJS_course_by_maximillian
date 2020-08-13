"use strict";

/*
 * A router for users | client side.
 */

// Core Dependencies
const path = require("path");

// 3rd party Dependencies
const express = require("express");

// Internal Dependencies
const productController = require("../controllers/product.js");

// Global variables
const router = express.Router();

router.get("/", productController.getProduct);

module.exports = router;
