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

const getProduct = (request, response, next) => {

    const prodId = request.params.productId;

    // Fetch product
    Product.findById(prodId, product => {

        response.render("shop/product-detail", {
            product,
            pageTitle: product.title,
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
            pageTitle: "Checkout Page",
            path: "/checkout",
        });
};

const getOrders = (request, response, next) => {

    return response
        .status(200)
        .render("shop/orders", {
            pageTitle: "Orders Page",
            path: "/orders",
        });
};

module.exports = {
    getProducts,
    getProduct,
    getIndex,
    getCart,
    getCheckout,
    getOrders
};
