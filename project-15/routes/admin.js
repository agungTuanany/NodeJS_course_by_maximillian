"use strict";

/*
 * A router for admin | as system administrator
 *
 */


// Core Dependencies
const path = require("path");

// 3rd party Dependencies
const express = require("express");
const { body } = require("express-validator");

// Internal Dependencies
const adminController = require("../controllers/admin.js");
const isAuth = require("../middleware/is-auth.js");

// Global variables
const router = express.Router();

router.get("/products", isAuth, adminController.getProducts);

router.get("/add-product", isAuth, adminController.getAddProduct);

router.post("/add-product",
    [
        body("title")
            .isString()
            .isLength({ min: 3 })
            .trim()
            .withMessage("The title must at least 3 characters"),
        // body("imageUrl")
        //     .isURL()
        //     .withMessage("Please enter the correct URL"),
        body("price")
            .isFloat()
            .withMessage("Please enter the correct price"),
        body("description")
            .isLength({ min: 5, max: 400 })
            .trim()
            .withMessage("Description must at least 5 characters")
    ],
    isAuth,
    adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post("/edit-product",
    [
        body("title")
            .isString()
            .isLength({ min: 3 })
            .trim()
            .withMessage("The title must at least 3 characters"),
        body("imageUrl")
            .isURL()
            .withMessage("Please enter the correct URL"),
        body("price")
            .isFloat()
            .withMessage("Please enter the correct price"),
        body("description")
            .isLength({ min: 5, max: 400 })
            .trim()
            .withMessage("Description must at least 5 characters")
    ],
    isAuth,
    adminController.postEditProduct
);

// @TODO: Change with method DELETE
router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
