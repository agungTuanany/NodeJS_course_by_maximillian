"use strict";

/*
 * Controller for "customer" views.
 *
 */

// Internal Dependencies

const getIndex = (request, response, next) => {

    return response
        .status(200)
        .render("shop/index", {
            pageTitle: "Index Page",
            path: "/"
        });
};

const getCart = (requets, response, next) => {

    return response
        .status(200)
        .render("shop/cart", {
            pageTitle: "Cart Page",
            path: "/cart"
        });
};

module.exports = {
    getIndex,
    getCart
}

