"use strict";

/*
 * A router for users or admin for logging in.
 *
 */

// Core Dependencies
const path = require("path");

// 3rd party Dependencies
const express = require("express");

// Internal Dependencies
const authController = require("./../controllers/auth.js");

// Global variables
const router = express.Router();

router.get("/login", authController.getLogin);


module.exports = router;
