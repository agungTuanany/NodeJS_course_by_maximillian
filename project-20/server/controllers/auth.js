"use strict"

// 3rd party Dependencies
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// Internal Dependencies
const User = require("./../models/user.js");

const signup = (request, response, next) => {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        const error = new Error("Signup validation failed");
        error.statusCode = 422;
        error.data = errors.array();

        throw error;
    }

    const email = request.body.email;
    const name = request.body.name;
    const password =request.body.password;

    bcrypt.hash(password, 12)
        .then(hashedPassword => {

            const user = new User({
                email: email,
                name: name,
                password: hashedPassword
            });

            console.log("===> User [2]", user);

            return user.save();
        })
        .then(result => {

            return response
                .status(201)
                .json({
                    message: "User created",
                    userId: result._id
                })
        })
        .catch(err => {

            if (!err.statusCode) {
            console.log("===> password bycrpt error:", err);
                err.statusCode = 500;
            };

            next(err);
        });
}

module.exports = {
    signup

}
