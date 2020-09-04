"use strict";

/*
 * Controller for "customer" views.
 *
 * Sat Aug 29 05:07:10 AM WIB 2020
 * @TODO: change all promise with async-await
 *
 */

// Internal Dependencies
const Product = require("./../models/product.js");
// const Order = require("./../models/order.js");

const getProducts = (request, response, next) => {

    Product.find()
        .then(products => {

            return response
                .status(200)
                .render("shop/index", {
                    pageTitle: "Shop",
                    path: "/",
                    prods: products
                });
        })
        .catch(err => console.log(err));
};

const getProduct = (request, response, next) => {

    const prodId = request.params.productId;

    Product.findById(prodId)
        .then(product => {

            return response
                .status(200)
                .render('shop/product-detail', {
                    pageTitle: product.title,
                    path: '/products',
                    product: product
                });
        })
        .catch(err => console.log(err));
};

const getIndex = (request, response, next) => {

    Product.find()
        .then(products => {

            return response
                .status(200)
                .render("shop/index", {
                    pageTitle: "Shop",
                    path: "/",
                    prods: products
                });
        })
        .catch(err => console.log(err));
};

const getCart = (request, response, next) => {

    request.user.getCart()
        .then(products => {

            // console.log("====> getCart shop models:", products);
            return response.render("shop/cart", {
                pageTitle: "Your Cart",
                path: "/cart",
                products: products
            });
        })
        .catch(err => console.log(err));
};

const postCart = (request, response, next) => {

    const prodId = request.body.productId;

    Product.findById(prodId)
        .then(product => {

            return request.user.addToCart(product);
        })
        .then(result => {                           // This chain is from db.collection("users").updateOne()

            // console.log("====> postCart:", result);
            return response
                .status(301)
                .redirect("/cart");
        })
        .catch(err => console.log(err));
};

const postCartDeleteProduct = (request, response, next) => {

    const prodId = request.body.productId;

    request.user.deleteItemFromCart(prodId)
        .then(result => {

            console.log("====> postCartDeleteProduct", result);
            return response
                .status(301)
                .redirect("/cart");
        })
        .catch(err => console.log(err));
};

// @TODO work in this controllers with Sequelize
const getCheckout = (request, response, next) => {

    return response
        .status(200)
        .render("shop/checkout", {
            pageTitle: "Checkout Page",
            path: "/checkout",
        });
};

const postOrder = (request, response, next) => {

    let fetchedCart;

    request.user.addOrder()
        .then(result => {

            return response
                .status(301)
                .redirect("/orders");

        })
        .catch(err => console.log(err));
};

const getOrders = (request, response, next) => {

    request.user.getOrders()
        .then(orders => {

            // console.log("====> getOrders", orders);
            return response
                .status(200)
                .render("shop/orders", {
                    pageTitle: "Orders Page",
                    path: "/orders",
                    orders: orders
                });
        })
        .catch(err => console.log(err));
};

module.exports = {
    getProducts,
    getProduct,
    getIndex,
    getCart,
    postCart,
    postCartDeleteProduct,
    getCheckout,
    postOrder,
    getOrders
};
