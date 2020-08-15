"use strict";

/*
 * Controller for "customer" views.
 *
 */

// Internal Dependencies
const Product = require("./../models/product.js");

const getProducts = (request, response, next) => {

    Product.fetchAll(products => {

        return response
            .status(200)
            .render("shop/product-list", {
                products,
                pageTitle: "All Products",
                path: "/products"
            });
    });
};

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
            pageTitle: "Your Cart",
            path: "/cart"
        });
};

const getCheckout = (request, response, next) => {

    return response
        .status(200)
        .render("shop/checkout", {
            pageTitle: "Checkout page",
            path: "/checkout",
        });
};

module.exports = {
    getProducts,
    getIndex,
    getCart,
    getCheckout
};
