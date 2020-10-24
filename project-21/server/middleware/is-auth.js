"use strict"

// 3rd party Dependencies
const jwt = require("jsonwebtoken");

const jwtAuth = (request, response, next) => {

    const authHeader = request.get("Authorization");

    if (!authHeader) {
        const error = new Error("===> authHeader User is not authenticated");
        error.statusCode = 401;

        throw error;
    }

    const token = request.get("Authorization").split(" ")[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, "somesupersecretsecret");

    }
    catch (err) {
        console.log("===> isAuth error", err);
        err.status = 501;

        throw err;
    };

    if (!decodedToken) {
        const error = new Error("User is not authenticated");
        error.statusCode = 401;

        throw err;
    };

    request.userId = decodedToken.userId;

    next();
};

module.exports = {
    jwtAuth
};
