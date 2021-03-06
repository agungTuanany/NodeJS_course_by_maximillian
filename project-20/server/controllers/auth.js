"use strict"

// 3rd party Dependencies
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
            console.log("===> auth signup error:", err);
                err.statusCode = 500;
            };

            next(err);
        });
};

const login = (request, response, next) => {

    const email = request.body.email;
    const password = request.body.password;
    let loadedUser;

    User.findOne({ email: email })
        .then(user => {

            if (!user) {
                const error = new Error("A user with this email could not be found");
                error.statusCode = 401;     // @NOTE: 401 = not authenticated

                throw error;
            };

            loadedUser = user;

            console.log("===> loadedUser", loadedUser)
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {

            if (!isEqual) {
                const error = new Error("Wrong Password!");
                error.statusCode = 401;

                throw error;
            };

            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                },
                "somesupersecretsecret",
                { expiresIn: "1h" }
            );

            response
                .status(200)
                .json({
                    token: token,
                    userId: loadedUser._id.toString()
                });
        })
        .catch(err => {

            if (!err.statusCode) {
            console.log("===> login error:", err);
                err.statusCode = 500;
            };

            next(err);
        });
}

module.exports = {
    signup,
    login
};
