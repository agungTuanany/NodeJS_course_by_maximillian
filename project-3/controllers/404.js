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
            path: "/"
        });
};

module.exports = {
    get404
};
