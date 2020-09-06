"use strict";

/*
 * Controller for authentication
 *
 */

const getLogin = (request, response, next) => {

    return response
        .status(200)
        .render("auth/login", {
            pageTitle: "Login",
            path: "/login",
            isAuthenticated: request.isLoggedIn
        });
};

const postLogin = (request, response, next) => {

    request.isLoggedIn = true;
    return response
        .status(301)
        .redirect("/")
};

module.exports = {
    getLogin,
    postLogin
};
