"use strict"

// 3rd party Dependencies
const jwt = require("jsonwebtoken");

const jwtAuth = (request, response, next) => {

    const authHeader = request.get("Authorization");

    if (!authHeader) {
        request.isAuth = false;
        return next();
    }

    const token = request.get("Authorization").split(" ")[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, "somesupersecretsecret");

    }
    catch (err) {
        console.log("===> isAuth error", err);
        request.isAuth = false;

        return next();
    };

    if (!decodedToken) {
        request.isAuth = false;

        return next();
    };

    request.userId = decodedToken.userId;
    request.isAuth = true;

    next();
};

module.exports = {
    jwtAuth
};
