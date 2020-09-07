"use strict";

/*
 * Controller for authentication
 *
 * @param: destroy() a method provided by session (express-session)
 */

const getLogin = (request, response, next) => {

    // const isLoggedIn = request.get("Cookie")
    //     .split(";")[0]                          // Changes the [0] values as your cookies sequence
    //     .trim()
    //     .split("=")[0] === "true";

    // console.log("===> isLoggedIn:", isLoggedIn)

    console.log("===> request.session.isLoggedIn:", request.session.isLoggedIn);
    return response
        .status(200)
        .render("auth/login", {
            pageTitle: "Login",
            path: "/login",
            isAuthenticated: false
        });
};

const postLogin = (request, response, next) => {

    request.session.isLoggedIn = true;
    return response
        .status(301)
        .redirect("/")
};

const postLogout = (request, response, next) => {

    request.session.destroy(err => {

        if(err) {
            console.log("===> postLogout error:", err);
            throw err;
            return;
        };

        return response
            .status(301)
            .redirect("/")
    });
};

module.exports = {
    getLogin,
    postLogin,
    postLogout
};
