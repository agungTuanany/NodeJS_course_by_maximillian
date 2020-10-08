"use strict";

/*
 * A router for users or admin for logging in.
 *
 */

// Core Dependencies
const path = require("path");

// 3rd party Dependencies
const express = require("express");
const { check } = require("express-validator")

// Internal Dependencies
const authController = require("./../controllers/auth.js");

// Global variables
const router = express.Router();

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.get("/signup", authController.getSignup);

router.post("/signup",
    check("email")
    .isEmail()
    .withMessage("Enter a valid email"),
    authController.postSignup);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

router.post("/logout", authController.postLogout);


module.exports = router;
