"use strict";

/*
 * Controller for page-not-found
 *
 */

const get404 = (request, response, next) => {

    return response
        .status(404)
        .render("page-not-found", {
            pageTitle: "Page Not Found",
            path: "/404",
            isAuthenticated: request.session.isLoggedIn
        });
};

const get500 = (request, response, next) => {

    return response
        .status(500)
        .render("500", {
            pageTitle: "Server Error",
            path: "/500",
            isAuthenticated: request.session.isLoggedIn
        });
};

module.exports = {
    get404,
    get500
};
