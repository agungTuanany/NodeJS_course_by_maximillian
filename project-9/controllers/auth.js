"use strict";

/*
 * Controller for authentication
 *
 */

const getLogin = (request, response, next) => {

    response.render("auth/login", {
        pageTitle: "Login",
        path: "/login"
    });
};

module.exports = {
    getLogin,
};
