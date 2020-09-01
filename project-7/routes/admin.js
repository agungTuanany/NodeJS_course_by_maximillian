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

router.get("/add-product", adminController.getAddProduct);

router.get("/products", adminController.getProducts);

router.post("/add-product", adminController.postAddProduct);

// router.get("/edit-product/:productId", adminController.getEditProduct);

// router.post("/edit-product", adminController.postEditProduct);

// // @TODO: Change with method DELETE
// // "/admin/delete-product" POST
// router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
