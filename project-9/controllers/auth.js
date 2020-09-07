"use strict";

/*
 * Controller for authentication
 *
 * @param: destroy() a method provided by session (express-session)
 */

// Internal Dependencies
const User = require("./../models/user.js");

const getLogin = (request, response, next) => {

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

    User.findById("5f53be3cb6e9934b390021e0")
        .then(user => {

            request.session.isLoggedIn = true;
            request.session.user = user;
            request.session.save(err => {
                console.log(err);
                return response
                    .status(301)
                    .redirect("/")
            })
        })
        .catch(err => console.log(err));
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
