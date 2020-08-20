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
const adminController = require("../controllers/admin.js");

// Global variables
const router = express.Router();

// "/admin/add-product" => GET
router.get("/add-product", adminController.getAddProduct);

// "/admin/products" => GET
router.get("/products", adminController.getProducts);

// "/admin/add-product" => POST
router.post("/add-product", adminController.postAddProduct);

// "/admin/edit-product" => GET
router.get("/edit-product/:productId", adminController.getEditProduct);

// "/admin/edit-product" => POST
router.post("/edit-product", adminController.postEditProduct);

module.exports = router;
