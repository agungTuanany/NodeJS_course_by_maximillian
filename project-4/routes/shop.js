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
const shopController = require("../controllers/shop.js");

// Global variables
const router = express.Router();

// "/" => GET
router.get("/", shopController.getIndex);

// "/products" => GET
router.get("/products", shopController.getProducts);

// "/products" => GET
router.get("/cart", shopController.getCart);

// "/checkout" => GET
router.get("/checkout", shopController.getCheckout);

// "/orders" => GET
router.get("/orders", shopController.getOrders);

module.exports = router;
