"use strict";

/*
 * A router for users or admin for logging in.
 *
 * @param: normalizeEmail:
 * https://github.com/validatorjs/validator.js
 * Sanitizing data is also something make sense to ensure that your data is stored in a uniform format
*/

// Core Dependencies
const path = require("path");

// 3rd party Dependencies
const express = require("express");
const { check, body } = require("express-validator")

// Internal Dependencies
const authController = require("./../controllers/auth.js");
const User = require("./../models/user.js");

// Global variables
const router = express.Router();

router.get("/login", authController.getLogin);

router.post("/login",
    [
        body("email")
            .isEmail()
            .withMessage("Please enter a valid email address")
            .normalizeEmail(),
        body("password", "Password not valid")
            .isLength({ min:5 })
            .isAlphanumeric()
            .trim()
    ],
    authController.postLogin);

router.get("/signup", authController.getSignup);

router.post("/signup",
    [

        check("email")
            .isEmail()
            .withMessage("Enter a valid email")
            .custom((value, {request}) => {

                // if (value === "test@test.com") {
                //     throw new Error("This email address is forbidden");
                // };

                // return true;
            // @NOTE: async validation
                return User.findOne({ email: value })
                    .then(userDoc => {

                        if (userDoc) {
                            return Promise.reject("E-Mail exists already, please pick a different one.")
                        }
                    })
            })
            .normalizeEmail(),
        body("password", "Please enter a password with only numbers and text at least 5 characters")
            .isLength({ min:5 })
            .isAlphanumeric()
            .trim(),
        body("confirmPassword")
            .trim()
            .custom((value, {request}) => {

            if (value !== reqeust.body.password) {
                throw new Error ("Password not match, Please enter the matched password");
            };

            return true;
        })
    ],
    authController.postSignup);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

router.post("/logout", authController.postLogout);


module.exports = router;
