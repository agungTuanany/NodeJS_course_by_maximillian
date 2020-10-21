"use strict"

// 3rd party Dependencies
const express = require("express");
const { body } = require("express-validator");

// Internal Dependencies
const User = require("./../models/user.js");
const authController = require("./../controllers/auth.js");

const router = express.Router();

router.put("/signup",
    [
        body("email")
            .isEmail()
            .withMessage("Please enter a valid email")
            .custom((value, { request }) => {

                return User
                    .findOne({ email: value })
                    .then(userDoc => {

                        if (userDoc) {
                            return Promise.reject("Email address already exists");
                        }
                    });
            })
            .normalizeEmail(),
        body("password")
            .trim()
            .isLength({ min: 5 }),
        body("name")
            .trim()
            .not()
            .isEmpty()
    ],
    authController.signup
)

module.exports = router;
