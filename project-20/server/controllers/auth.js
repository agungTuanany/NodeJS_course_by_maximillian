"use strict"

// 3rd party Dependencies
const { validationResult } = require("express-validator");

// Internal Dependencies
const User = require("./../models/user.js");

const signup = (request, response, next) => {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        const error = new Error("Signuo validation failed");
        error.statusCode = 422;
        error.data = errors.array();
    }

    const email = request.body.email;
    const name = request.body.name;
    const password =request.body.password;

}

module.exports = {
    signup

}
