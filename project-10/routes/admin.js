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
const isAuth = require("../middleware/is-auth.js");

// Global variables
const router = express.Router();

router.get("/products", isAuth, adminController.getProducts);

router.get("/add-product", isAuth, adminController.getAddProduct);

router.post("/add-product", isAuth, adminController.postAddProduct);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post("/edit-product", isAuth, adminController.postEditProduct);

// @TODO: Change with method DELETE
router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
