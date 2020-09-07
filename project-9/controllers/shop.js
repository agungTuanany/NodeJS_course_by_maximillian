"use strict";

/*
 * Controller for "customer" views.
 *
 * Sat Aug 29 05:07:10 AM WIB 2020
 * @TODO: change all promise with async-await
 *
 * @param: ._doc is a mongoose special field to access just the data
 */

// Internal Dependencies
const Product = require("./../models/product.js");
const Order   = require("./../models/order.js");

const getProducts = (request, response, next) => {

    Product.find()
        .then(products => {

            return response
                .status(200)
                .render("shop/index", {
                    pageTitle: "Shop",
                    path: "/",
                    prods: products,
                    isAuthenticated: request.session.isLoggedIn
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
                    product: product,
                    isAuthenticated: request.session.isLoggedIn
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
                    prods: products,
                    isAuthenticated: request.session.isLoggedIn
                });
        })
        .catch(err => console.log(err));
};

const getCart = (request, response, next) => {

    console.log("====> getCart request.user", request.user);
    request.user.populate("cart.items.productId")   //  cause populate() doesn't return a promise
        .execPopulate()
        .then(user => {

            // console.log("====> getCart:", user.cart.items);
            const products = user.cart.items;
            return response.render("shop/cart", {
                pageTitle: "Your Cart",
                path: "/cart",
                products: products,
                isAuthenticated: request.session.isLoggedIn
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
        .then(result => {

            console.log("====> postCart:", result);
            return response
                .status(301)
                .redirect("/cart");
        })
        .catch(err => console.log(err));
};

const postCartDeleteProduct = (request, response, next) => {

    const prodId = request.body.productId;

    request.user.removeFromCart(prodId)
        .then(result => {

            console.log("====> postCartDeleteProduct", result);
            return response
                .status(301)
                .redirect("/cart");
        })
        .catch(err => console.log(err));
};

const postOrder = (request, response, next) => {

    request.user.populate("cart.items.productId")
        .execPopulate()
        .then(user => {

            console.log("====> postOrder:", user.cart.items);
            const products = user.cart.items.map(i => {

                return {
                    product  : { ...i.productId._doc },
                    quantity : i.quantity
                };
            });

            const order = new Order({
                user: {
                    firstName: request.user.firstName,
                    userId: request.user
                },
                products: products
            });

            order.save();
        })
        .then(() => {

          return request.user.clearCart();
        })
        .then(()=> {

            return response
                .status(301)
                .redirect("/orders");
        })
        .catch(err => console.log(err));
};

const getOrders = (request, response, next) => {

    Order.find({ "user.userId": request.user._id })
        .then(orders => {

            // console.log("====> getOrders", orders);
            return response
                .status(200)
                .render("shop/orders", {
                    pageTitle: "Orders Page",
                    path: "/orders",
                    orders: orders,
                    isAuthenticated: request.session.isLoggedIn
                });
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
            isAuthenticated: request.session.isLoggedIn
        });
};

module.exports = {
    getProducts,
    getProduct,
    getIndex,
    getCart,
    postCart,
    postCartDeleteProduct,
    postOrder,
    getOrders,
    getCheckout
};
