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

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postCartDeleteProduct);

router.get("/checkout", shopController.getCheckout);

router.post("/create-order", shopController.postOrder);

router.get("/orders", shopController.getOrders);

module.exports = router;
