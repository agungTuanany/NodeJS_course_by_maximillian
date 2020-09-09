"use strict";

/*
 * Controller for authentication
 *
 * @param: destroy() a method provided by session (express-session)
 */

// 3rd party Dependencies
const bcrypt = require("bcryptjs");

// Internal Dependencies
const User = require("./../models/user.js");

const getLogin = (request, response, next) => {

    let message = request.flash("error");

    if (message.length > 0) {
        message = message[0]
    }
    else {
        message = null;
    };

    // console.log("===> request.session.isLoggedIn:", request.session.isLoggedIn);
    return response
        .status(200)
        .render("auth/login", {
            pageTitle: "Login",
            path: "/login",
            errorMessage: message
        });
};

const postLogin = (request, response, next) => {

    const email = request.body.email;
    const password = request.body.password;

    User.findOne({ email: email })
        .then(user => {

            if (!user) {
                request.flash("error", "Invalid email address");
                return response
                    .status(301)
                    .redirect("/login");
            };

            bcrypt.compare(password, user.password)
                .then(doMatch => {

                    if (!doMatch) {
                        request.flash("error", "Invalid password");
                        return response
                            .status(301)
                            .redirect("/login");
                    };

                    request.session.isLoggedIn = true;
                    request.session.user = user;
                    request.session.save(err => {

                        if(!err) {
                            return response
                                .status(303)
                                .redirect("/");
                        };

                        console.log("===> session error:", err);
                    });
                })
                .catch(err => {

                    console.log("===> bcrypt error:", err);
                    return response
                        .status(301)
                        .redirect("/login");
                });
        })
        .catch(err => console.log(err));
};

const getSignup = (request, response, next) => {

    let message = request.flash("error");

    if (message.length > 0) {
        message = message[0];
    }
    else {
        message = null;
    };

    return response
        .status(200)
        .render("auth/signup", {
            pageTitle: "Signup",
            path: "/signup",
            errorMessage: message
        });
};

const postSignup = (request, response, next) => {

    const email = request.body.email;
    const password = request.body.password;
    const confirmPassword =request.body.confirmPassword;

    User.findOne({ email: email })
        .then(userDoc => {

            if (userDoc) {
                request.flash("error", "E-Mail exists already, please pick a different one.");
                return response
                    .status(301)
                    .redirect("/signup");
            };

            return bcrypt.hash(password, 12)
                .then(hashedPassword => {

                    const user = new User({
                        email    : email,
                        password : hashedPassword,
                        cart     : { item: [] }
                    });

                    if (!user.email) {

                        console.log("===> user.email:", user.email);
                        request.flash("error", "You are not fill the email or password");
                        return;
                    };

                    return user.save();
                })
                .then(result => {

                    if (!result) {
                        console.log("===> A. bcrypt result", result);
                        return response
                            .status(200)
                            .redirect("/signup");
                    };

                    console.log("===> B. bcrypt result", result);
                    return response
                        .status(200)
                        .redirect("/login");
                })
                //@NOTE: throw the error if user not fill the email or the password
                //@TODO: create unit test
                .catch(err => console.log("===> bcrypt error:", err));
        })
        .catch(err => console.log("===> postSignup error:", err));
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
    getSignup,
    postSignup,
    postLogout
};
