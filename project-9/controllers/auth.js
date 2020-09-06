"use strict";

/*
 * Controller for authentication
 *
 */

const getLogin = (request, response, next) => {

    const isLoggedIn = request.get("Cookie")
        .split(";")[1]
        .trim()
        .split("=")[1];

    console.log("===> isLoggedIn:", isLoggedIn)

    return response
        .status(200)
        .render("auth/login", {
            pageTitle: "Login",
            path: "/login",
            isAuthenticated: isLoggedIn
        });
};

const postLogin = (request, response, next) => {

    // request.isLoggedIn = true;
    response.setHeader("Set-Cookie", "loggedIn=true")
    return response
        .status(301)
        .redirect("/")
};

module.exports = {
    getLogin,
    postLogin
};
