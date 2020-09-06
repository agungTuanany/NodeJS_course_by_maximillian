"use strict";

/*
 * Controller for authentication
 *
 */

const getLogin = (request, response, next) => {

    // const isLoggedIn = request.get("Cookie")
    //     .split(";")[0]                          // Changes the [0] values as your cookies sequence
    //     .trim()
    //     .split("=")[0] === "true";

    // console.log("===> isLoggedIn:", isLoggedIn)

    return response
        .status(200)
        .render("auth/login", {
            pageTitle: "Login",
            path: "/login",
            isAuthenticated: false
            // isAuthenticated: isLoggedIn
        });
};

const postLogin = (request, response, next) => {

    // request.isLoggedIn = true;
    response.setHeader("Set-Cookie", "loggedIn=true; HttpOnly")
    return response
        .status(301)
        .redirect("/")
};

module.exports = {
    getLogin,
    postLogin
};
